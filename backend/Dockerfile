FROM node

WORKDIR /express

COPY package.json /express/

RUN npm install

COPY . /express/

EXPOSE 3000
CMD ["npm", "start"]
