FROM node:18

RUN apt-get update &&  \
    apt-get install -y git curl unzip procps time && \
    apt-get install -y git openssh-client curl && \
    apt-get clean && \
    rm -rf /var/cache/apk/*

ENV PROJECT_DIR /front
ARG IDEURL=https://download.jetbrains.com/webstorm/WebStorm-2023.3.3.tar.gz

WORKDIR $PROJECT_DIR

RUN curl -fsSL -o ide.tar.gz $IDEURL && \
mkdir ide && \
tar xfz ide.tar.gz --strip-components=1 -C ide && \
rm ide.tar.gz

COPY ../package.json $PROJECT_DIR

RUN npm install

RUN curl -sL "https://github.com/go-task/task/releases/download/v3.9.0/task_linux_amd64.deb" -o task.deb && dpkg -i task.deb && rm task.deb

CMD yes '' | ide/bin/remote-dev-server.sh run $PROJECT_DIR --listenOn 0.0.0.0 --port 5993
