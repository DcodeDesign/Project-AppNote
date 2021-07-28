FROM node:9

WORKDIR /angularjs

COPY package.json /angularjs/

RUN npm install

COPY . /angularjs/

EXPOSE 4201
CMD ["npm", "start"]
