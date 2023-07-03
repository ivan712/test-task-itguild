FROM node:latest
WORKDIR /app
RUN apt update -y
RUN apt upgrade -y
RUN apt install -y sqlite3 libsqlite3-dev
RUN mkdir /db
RUN /usr/bin/sqlite3 /db/test.db