FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY bin/hubot /usr/src/app/bin/
COPY bin/hubot.cmd /usr/src/app/bin/
COPY scripts/test.coffee /usr/src/app/scripts/
COPY start.sh /usr/src/app/

EXPOSE 8080
EXPOSE 9009
ENTRYPOINT ["sh", "start.sh"]
