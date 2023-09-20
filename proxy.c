#include <stdio.h>
#include "csapp.h"

/* Recommended max cache and object sizes */
#define MAX_CACHE_SIZE 1049000
#define MAX_OBJECT_SIZE 102400

void doit(int fd);
void parse_uri(char *uri,char *hostname,char *path, char *port);
void clienterror(int fd, char *cause, char *errnum, char *shortmsg, char *longmsg);
void blank_response(int fd, char *buf);

/* You won't lose style points for including this long line in your code */
static const char *user_agent_hdr =
    "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:10.0.3) Gecko/20120305 "
    "Firefox/10.0.3\r\n";

int main(int argc, char ** argv) {
  
  int listenfd, connfd;
  socklen_t clientlen;
  struct sockaddr_storage clientaddr;
  char port[MAXLINE], hostname[MAXLINE];

  if (argc != 2) {
    fprintf(stderr, "usage: %s <port>\n", argv[0]);
    exit(1);
  }

  listenfd = Open_listenfd(argv[1]);

  while (1) {
    clientlen = sizeof(clientaddr);
    connfd = Accept(listenfd, (SA *)&clientaddr, &clientlen);
    Getnameinfo((SA *)&clientaddr, clientlen, hostname, MAXLINE, port, MAXLINE, 0);
    printf("Accepted connection from (%s, %s)\n", hostname, port);
    doit(connfd);
    Close(connfd);
  }
  return 0;
}

void doit(int fd)
{
  int clientfd;

  char buf[MAXLINE], method[MAXLINE], uri[MAXLINE], version[MAXLINE];
  char filename[MAXLINE], host[MAXLINE];
  char header[MAXLINE];
  char response_body[MAXLINE];
  char object[MAX_OBJECT_SIZE];
  char path[MAXLINE], port[MAXLINE];
  rio_t rio, rio2;

  Rio_readinitb(&rio, fd);
  Rio_readlineb(&rio, buf, MAXLINE);
  
  sscanf(buf, "%s %s %s", method, uri, version);

  if (strcasecmp(method, "GET")) {
    clienterror(fd, method, "501", "Not implemented", "Tiny does not implement this method");
    return;
  }

  parse_uri(uri, host, filename, port);

  sprintf(header, "GET %s HTTP/1.0\r\n", filename);
  sprintf(header, "%sUser-Agent: %s", header, user_agent_hdr);
  sprintf(header, "%sConnection: close\r\n", header);
  sprintf(header, "%sProxy-Connection: close\r\n", header);

  while (strcmp(buf, "\r\n")) {
    Rio_readlineb(&rio, buf, MAXLINE);

    if (strstr(buf, "User-Agent:")) {
      continue;
    }
    else if (strstr(buf, "Connection:")) {
      continue;
    }
    else if (strstr(buf, "Proxy-Connection:")) {
      continue;
    }
    else {
      sprintf(header, "%s%s", header, buf);
    }
  }


  printf("Request-header:\n");
  printf("%s", header);

  clientfd = Open_clientfd(host, port);
  Rio_readinitb(&rio2, clientfd);

  Rio_writen(clientfd, header, strlen(header));

  Rio_readlineb(&rio2, buf, MAXLINE);
  sprintf(header, buf);

  while (strcmp(buf, "\r\n")) {
    Rio_readlineb(&rio2, buf, MAXLINE);
    sprintf(header, "%s%s", header, buf);
  }

  printf("response-header:\n");
  printf("%s", header);

  Rio_writen(fd, header, strlen(header));

  size_t n;
  while ((n = Rio_readlineb(&rio2, buf, MAXLINE)) != 0) {
    printf("%d바이트 받음\n", n);
    printf("%s\n", buf);
    Rio_writen(fd, buf, n);
  }
  Close(clientfd);
}

void clienterror(int fd, char *cause, char *errnum, char *shortmsg, char *longmsg)
{
  char buf[MAXLINE], body[MAXBUF];

  sprintf(body, "<html><title>Tiny Error</title>");
  sprintf(body, "%s<body bgcolor=""ffffff"">\r\n", body);
  sprintf(body, "%s%s: %s\r\n", body, errnum, shortmsg);
  sprintf(body, "%s<p>%s: %s\r\n", body, longmsg, cause);
  sprintf(body, "%s<hr><em>The Tiny Web server</em>\r\n", body);

  sprintf(buf, "HTTP/1.0 %s %s\r\n", errnum, shortmsg);

  Rio_writen(fd, buf, strlen(buf));
  sprintf(buf, "Content-type: text/html\r\n");

  Rio_writen(fd, buf, strlen(buf));
  sprintf(buf, "Content-length: %d\r\n\r\n", (int)strlen(body));

  Rio_writen(fd, buf, strlen(buf));

  Rio_writen(fd, body, strlen(body));
}

void blank_response(int fd, char *buf)
{
  strcpy(buf, "HTTP/1.0 200 OK\r\n\r\n");
  Rio_writen(fd, buf, strlen(buf));
  return;
}

void parse_uri(char *uri,char *hostname,char *filename,char *port)
{
  char *p1 = strstr(uri, "//");
  p1 += 2;

  char *p2 = strstr(p1, "/");

  char *p3 = strstr(p1, ":");  
  
  if (p3 != NULL) {
    strncpy(port, p3 + 1, p2 - p3 - 1);
    strncpy(hostname, p1, p3 - p1);
  }
  else {
    strcpy(port, "80");
    strncpy(hostname, p1, p2 - p1);
  }
  strcpy(filename, p2);
}