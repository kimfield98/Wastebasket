/*
 * adder.c - 두 숫자를 더하는 최소한의 CGI 프로그램
 */
/* $begin adder */
#include "csapp.h"

int main(void) {
    char *buf, *p;
    char arg1[MAXLINE], arg2[MAXLINE], content[MAXLINE];
    int n1=0, n2=0;

    /* 두 인수 추출 */
    if ((buf = getenv("QUERY_STRING")) != NULL) {
      // 쿼리 문자열에서 & 문자를 찾아 첫 번째 인수와 두 번째 인수로 분리
      p = strchr(buf, '&');
      *p = '\0';
      strcpy(arg1, buf);
      strcpy(arg2, p+1);
      // 문자열을 정수로 변환
      n1 = atoi(arg1);
      n2 = atoi(arg2);
    }

    /* 응답 본문 생성 */
    sprintf(content, "Welcome to add.com: ");
    sprintf(content, "%sTHE Internet addition portal.\r\n<p>", content);
    sprintf(content, "%sThe answer is: %d + %d = %d\r\n<p>", content, n1, n2, n1 + n2);
    sprintf(content, "%sThanks for visiting!\r\n", content);
      
    /* HTTP 응답 생성 */
    printf("Connection: close\r\n");
    printf("Content-length: %d\r\n", (int)strlen(content));
    printf("Content-type: text/html\r\n\r\n");
    printf("%s", content);
    fflush(stdout);
    
    // 프로그램 종료
    exit(0);
    }
/* $end adder */