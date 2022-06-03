FROM telkomindonesia/alpine:nodejs-12

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --update --no-cache --virtual .build-dev \
        build-base \
        python \
        python-dev \
    && npm i -g npm@6.14.11 \
    && npm i -g node-gyp \
    && npm i \
    && npm install sequelize-cli -g \
    && npm install express sequelize mysql2 --save \
    && npm install nodemon --save-dev \
    && apk del .build-dev

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]