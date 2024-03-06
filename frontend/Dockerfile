# 이 컨테이너에서 사용할 프로그램 선언 및 설치
FROM nginx

# 컨테이너 기동 시 아래 경로 파일에서부터 시작
WORKDIR /app

# /app/build 디렉토리 생성
RUN mkdir ./build

# 작업중인 프로젝트에서 Dockerfile이 존재하는 경로상 
# ./build 디렉토리 내용을 전부 컨테이너의 /app/build 로 이동
ADD ./build ./build

# 컨테이너에 설치한 nginx의 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 마찬가지로 nignx의 기본 설정 파일 삭제
RUN rm /etc/nginx/nginx.conf

# 삭제한 파일에 대해 프로젝트에서 작성한 nginx 설정 파일로 대체하기 위해 복사
COPY ./default.conf /etc/nginx/conf.d/

# 마찬가지로 복사
COPY ./nginx.conf /etc/nginx/

# 이 컨테이너가 개방할 네트워크 포트 번호
EXPOSE 80 443

# 모든 준비가 끝났으면 아래 명령어를 차례대로 수행
CMD ["nginx", "-g", "daemon off;"]