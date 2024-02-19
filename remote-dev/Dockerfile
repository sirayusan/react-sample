FROM node:18
ARG PROJDIR=/front
ARG IDEURL=https://download.jetbrains.com/webstorm/WebStorm-2023.3.4.tar.gz

WORKDIR /front/frontend

RUN curl -fsSL -o ide.tar.gz $IDEURL && \
mkdir ide && \
tar xfz ide.tar.gz --strip-components=1 -C ide && \
rm ide.tar.gz

RUN #time ide/bin/remote-dev-server.sh installPlugins $PROJDIR com.intellij.ja

#CMD ide/bin/remote-dev-server.sh run $PROJDIR --listenOn 0.0.0.0 --port 5993