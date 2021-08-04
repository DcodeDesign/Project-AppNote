FROM node

RUN mkdir /express
WORKDIR /express

ENV PATH /express/node_modules/ .bin:$PATH

COPY package.json /express/

RUN npm install

COPY . /express/

EXPOSE 3000
CMD ["npm", "start"]
