#include "csapp.h"

// 함수 프로토타입 선언
void doit(int fd);
void read_requesthdrs(rio_t *rp);
int parse_uri(char *uri, char *filename, char *cgiargs);
void serve_static(int fd, char *filename, int filesize, char *method);
void get_filetype(char *filename, char *filetype);
void serve_dynamic(int fd, char *filename, char *cgiargs, char *method);
void clienterror(int fd, char *cause, char *errnum, char *shortmsg,
                 char *longmsg);

int main(int argc, char **argv) {
  int listenfd, connfd;  // 소켓 디스크립터 변수 선언
  char hostname[MAXLINE], port[MAXLINE];  // 호스트명과 포트 정보를 저장할 변수
  socklen_t clientlen;  // 클라이언트 주소의 길이를 저장하는 변수
  struct sockaddr_storage clientaddr;  // 클라이언트 주소 정보를 저장하는 구조체

  /* 명령행 인자 체크 */
  if (argc != 2) {
    fprintf(stderr, "usage: %s <port>\n", argv[0]);
    exit(1);  // 프로그램을 종료하고 오류 메시지 출력
  }

  // 소켓 생성 및 바인딩
  listenfd = Open_listenfd(argv[1]);

  while (1) {  // 무한 루프: 클라이언트의 연결을 지속적으로 수락하기 위함
    clientlen = sizeof(clientaddr);  // 클라이언트 주소 길이 초기화
    connfd = Accept(listenfd, (SA *)&clientaddr, &clientlen);  // 클라이언트 연결 수락
    Getnameinfo((SA *)&clientaddr, clientlen, hostname, MAXLINE, port, MAXLINE, 0);  // 클라이언트 주소 정보 얻기
    printf("Accepted connection from (%s, %s)\n", hostname, port);  // 클라이언트 연결 정보 출력
    doit(connfd);   // 요청 처리 함수 호출
    Close(connfd);  // 클라이언트와의 연결 종료
  }
}

// 클라이언트 요청 처리
void doit(int fd)
{
  int is_static;  // 정적 컨텐츠 여부를 나타내는 플래그
  struct stat sbuf;  // 파일 정보를 저장하는 구조체
  char buf[MAXLINE], method[MAXLINE], uri[MAXLINE], version[MAXLINE];  // 버퍼 및 HTTP 요청 라인 파싱을 위한 변수들
  char filename[MAXLINE], cgiargs[MAXLINE];  // 파일 이름 및 CGI 인자를 저장하는 변수들
  rio_t rio;  // Rio 라이브러리를 사용하여 리소스 입출력을 처리하는 구조체

  // 요청 처리를 위한 준비
  Rio_readinitb(&rio, fd);  // 리소스 입출력(버퍼) 초기화
  Rio_readlineb(&rio, buf, MAXLINE); // HTTP 요청 라인 읽기
  printf("Request headers:\n");
  printf("%s", buf);  // 요청 라인 출력
  sscanf(buf, "%s %s %s", method, uri, version);  // 요청 라인 파싱
  printf("HTTP Version: %s\n", version); // HTTP 버전 출력

  // GET 메서드인지 확인
  if (strcasecmp(method, "GET") && strcasecmp(method, "HEAD")
  ) {
    // 아직 지원하지 않는 메서드 처리: 501 Not Implemented
    clienterror(fd, method, "501", "Not implemented", "Tiny does not implement this method");
    return;
  }

  // 나머지 request header는 읽어버리고 무시
  read_requesthdrs(&rio);
  is_static = parse_uri(uri, filename, cgiargs); // URI 파싱

  // 파일 정보 확인
  if (stat(filename, &sbuf) < 0) {
    // 요청한 파일이 없는 경우: 404 Not Found
    clienterror(fd, filename, "404", "Not found", "Tiny couldn’t find this file");
    return;
  }

  // 정적 컨텐츠 서비스
  if (is_static) {
    // 파일이 일반 파일이 아니거나 읽기 권한이 없는 경우: 403 Forbidden
    if (!(S_ISREG(sbuf.st_mode)) || !(S_IRUSR & sbuf.st_mode)) {
      clienterror(fd, filename, "403", "Forbidden", "Tiny couldn’t read the file");
      return;
    }
  serve_static(fd, filename, sbuf.st_size, method);  // 정적 컨텐츠 제공
  }
  // 동적 컨텐츠 서비스
  else {
  if (!(S_ISREG(sbuf.st_mode)) || !(S_IXUSR & sbuf.st_mode)) {
      // 파일이 실행 가능한 프로그램이 아니거나 실행 권한이 없는 경우: 403 Forbidden
      clienterror(fd, filename, "403", "Forbidden", "Tiny couldn’t run the CGI program");
      return;
    }
  serve_dynamic(fd, filename, cgiargs, method);  // 동적 컨텐츠 제공
  }

  // HTTP 요청을 그대로 응답으로 반환하는 함수 호출
  // echo_request(&rio, fd);
}

// 클라이언트에게 에러 응답을 보내는 함수
void clienterror(int fd, char *cause, char *errnum, char *shortmsg, char *longmsg)
{
  char buf[MAXLINE], body[MAXBUF];

  // 오류 응답 본문 생성
  sprintf(body, "<html><title>Tiny Error</title>");
  sprintf(body, "%s<body bgcolor=""ffffff"">\r\n", body);
  sprintf(body, "%s%s: %s\r\n", body, errnum, shortmsg);
  sprintf(body, "%s<p>%s: %s\r\n", body, longmsg, cause);
  sprintf(body, "%s<hr><em>The Tiny Web server</em>\r\n", body);

  // 오류 응답 헤더 전송
  sprintf(buf, "HTTP/1.0 %s %s\r\n", errnum, shortmsg);
  Rio_writen(fd, buf, strlen(buf));
  sprintf(buf, "Content-type: text/html\r\n");
  Rio_writen(fd, buf, strlen(buf));
  sprintf(buf, "Content-length: %d\r\n\r\n", (int)strlen(body));
  Rio_writen(fd, buf, strlen(buf));

  // 오류 응답 본문 전송
  Rio_writen(fd, body, strlen(body));
}

// HTTP 요청 헤더를 읽고 출력하는 함수
void read_requesthdrs(rio_t *rp)
{
  char buf[MAXLINE];  // 버퍼 선언

  Rio_readlineb(rp, buf, MAXLINE); // 첫 번째 헤더 라인 읽기

  while(strcmp(buf, "\r\n")) { // 빈 줄을 만날 때까지 나머지 헤더 읽기
      Rio_readlineb(rp, buf, MAXLINE); // 다음 헤더 읽기
      printf("%s", buf); // 헤더 정보 출력
    }
  return;
}

// HTTP 요청 URI를 파싱하여 파일 경로와 CGI 인자를 추출하는 함수
int parse_uri(char *uri, char *filename, char *cgiargs)
{
  char *ptr;

  // URI에 "cgi-bin" 문자열이 포함되어 있는지 검사
  if (!strstr(uri, "cgi-bin")) { // 정적 컨텐츠 요청인 경우
    strcpy(cgiargs, ""); // CGI 인자를 비움
    strcpy(filename, "."); // 현재 디렉토리를 나타내는 . 문자열 추가
    
    // URI를 filename 뒤에 붙임 (예: /home.html)
    strcat(filename, uri);
    
    // URI가 / 로 끝나면 기본 파일 이름인 home.html로 설정
    if (uri[strlen(uri)-1] == '/')
      strcat(filename, "home.html");

    return 1; // 정적 컨텐츠 요청을 나타내는 플래그 반환
  }

  // "cgi-bin"을 포함하는 경우
  else { // 동적 컨텐츠 요청인 경우

    // URI 내에서 ? 문자의 위치를 찾음
    ptr = index(uri, '?');

    // ? 문자를 찾은 경우 (CGI 인자가 존재함)
    if (ptr) {
      strcpy(cgiargs, ptr+1);
      // ? 문자를 NULL 문자로 변경하여 URI와 분리
      *ptr = '\0';
    } else
    // ? 문자를 찾지 못한 경우, CGI 인자가 없음
    strcpy(cgiargs, "");
    // filename에 현재 디렉토리 경로를 설정
    strcpy(filename, ".");
    strcat(filename, uri);
    return 0; // 동적 컨텐츠 요청을 나타내는 플래그 반환
  }
}

// 정적 컨텐츠를 클라이언트에게 제공하는 함수
void serve_static(int fd, char *filename, int filesize, char *method)
{
  int srcfd;
  char *srcp, filetype[MAXLINE], buf[MAXBUF];

  // HTTP 응답 헤더 생성// 응답 헤더 전송
  get_filetype(filename, filetype);  // 파일 확장자로 Content-type 결정
  sprintf(buf, "HTTP/1.0 200 OK\r\n");  // 응답 상태 코드
  sprintf(buf, "%sServer: Tiny Web Server\r\n", buf);  // 서버 정보
  sprintf(buf, "%sConnection: close\r\n", buf);  // 연결 종료 헤더
  sprintf(buf, "%sContent-length: %d\r\n", buf, filesize);  // 컨텐츠 길이
  sprintf(buf, "%sContent-type: %s\r\n\r\n", buf, filetype);  // 컨텐츠 타입
  Rio_writen(fd, buf, strlen(buf));  // 응답 헤더 전송
  printf("Response headers:\n");
  printf("%s", buf);  // 응답 헤더 출력
  if (strcmp(method, "HEAD")==0) {
    return;
  }

  // 정적 파일을 클라이언트에게 전송
  srcfd = Open(filename, O_RDONLY, 0);  // 파일 열기
  // srcp = Mmap(0, filesize, PROT_READ, MAP_PRIVATE, srcfd, 0);  // 파일 매핑
  
  // 정적 콘텐츠를 제공할 때 mmap 및 rio_writen 대신 malloc, rio_readn 및 rio_writen을 사용
  srcp = (char *)Malloc(filesize);
  Rio_readn(srcfd, srcp, filesize);

  Close(srcfd);  // 파일 디스크립터 닫기
  Rio_writen(fd, srcp, filesize);  // 클라이언트에게 파일 전송
  // Munmap(srcp, filesize);  // 파일 매핑 해제
  free(srcp);
}

// 파일 이름으로부터 컨텐츠 타입(Content-type)을 결정하는 함수
void get_filetype(char *filename, char *filetype)
{
  // 파일 이름에서 마지막 '.' 문자를 찾음
  if (strstr(filename, ".html"))
  strcpy(filetype, "text/html"); // 확장자가 .html인 경우 HTML 컨텐츠
  else if (strstr(filename, ".gif"))
  strcpy(filetype, "image/gif"); // 확장자가 .gif인 경우 GIF 이미지
  else if (strstr(filename, ".png"))
  strcpy(filetype, "image/png"); // 확장자가 .png인 경우 PNG 이미지
  else if (strstr(filename, ".jpg"))
  strcpy(filetype, "image/jpeg"); // 확장자가 .jpg 또는 .jpeg인 경우 JPEG 이미지
  else if (strstr(filename, ".mp4"))
  strcpy(filetype, "video/mp4"); // 확장자가 .mp4인 경우 mp4 동영상
  else
  strcpy(filetype, "text/plain"); // 그 외의 경우 텍스트 파일로 처리
}

// 동적 컨텐츠를 클라이언트에게 제공하는 함수
void serve_dynamic(int fd, char *filename, char *cgiargs, char *method)
{
  char buf[MAXLINE], *emptylist[] = { NULL };

  // HTTP 응답의 첫 번째 부분 전송
  sprintf(buf, "HTTP/1.0 200 OK\r\n");
  Rio_writen(fd, buf, strlen(buf));
  // 서버 정보를 응답 헤더에 추가
  sprintf(buf, "Server: Tiny Web Server\r\n");
  Rio_writen(fd, buf, strlen(buf));
  if (strcmp(method, "HEAD")==0) {
    return;
  }

  // 자식 프로세스 생성 (CGI 프로그램 실행을 위한 프로세스 생성)
  if (Fork() == 0) {  // 자식 프로세스
  // QUERY_STRING 환경 변수 설정 (CGI 인자 전달)
    setenv("QUERY_STRING", cgiargs, 1);
    // 자식 프로세스의 표준 출력(stdout)을 클라이언트 소켓(fd)으로 리디렉션
    Dup2(fd, STDOUT_FILENO);
    // CGI 프로그램 실행 (filename은 CGI 프로그램 경로)
    Execve(filename, emptylist, environ);
  }
  // 부모 프로세스가 자식 프로세스를 기다림 (자식 프로세스의 종료 대기)
  Wait(NULL);
}

// 클라이언트의 HTTP 요청을 그대로 응답으로 반환하는 함수
void echo_request(rio_t *rp, int fd) {
  char buf[MAXLINE];  // 임시 버퍼
  char body[MAXLINE];  // 응답 본문
  char header[MAXLINE];  // 응답 헤더

  // HTTP 요청 본문을 그대로 읽어와서 응답 본문에 저장
  // 한 줄씩 읽어와서 출력과 응답 본문에 추가
  Rio_readlineb(rp, buf, MAXLINE);
  printf("%s", buf);
  sprintf(body, "%s", buf);

  // 읽은 줄이 빈 줄("\r\n")이 아니면 계속해서 읽고 응답 본문에 추가
  while (strcmp(buf, "\r\n")) {
    Rio_readlineb(rp, buf, MAXLINE);
    sprintf(body, "%s%s", body, buf);
    printf("%s", buf);
  }

  // 요청 본문과 동일한 내용을 포함한 응답 헤더 생성
  sprintf(header, "HTTP/1.0 200 OK\r\n");  // 응답 상태 코드
  sprintf(header, "%sServer: Tiny Web Server\r\n", header);  // 서버 정보
  sprintf(header, "%sConnection: close\r\n", header);  // 연결 종료 헤더
  sprintf(header, "%sContent-length: %d\r\n", header, strlen(body));  // 컨텐츠 길이
  sprintf(header, "%sContent-type: %s\r\n\r\n", header, "text/plain");  // 컨텐츠 타입

  // 응답 헤더를 클라이언트에게 전송
  Rio_writen(fd, header, strlen(header));
  printf("Response headers:\n");
  printf("%s", header);

  // 응답 본문을 클라이언트에게 전송
  Rio_writen(fd, body, strlen(body));
  
  // 응답 내용을 "response.txt" 파일에 저장
  FILE *response_file = fopen("response.txt", "w");
  // 파일 열기가 실패한 경우 오류 메시지를 출력하고 함수를 종료
  if (response_file == NULL) {
    fprintf(stderr, "Failed to open response.txt for writing\n");
    return;
  }
  fprintf(response_file, "%s", header);  // 헤더를 파일에 저장
  fprintf(response_file, "%s", body);    // 본문을 파일에 저장
  fclose(response_file);
}
