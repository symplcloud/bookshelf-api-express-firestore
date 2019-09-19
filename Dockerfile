FROM node:10.14.2

RUN mkdir -p /opt/symplcloud
WORKDIR /opt/symplcloud

COPY package.json package-lock.json /opt/symplcloud/
RUN npm install

COPY . /opt/symplcloud

CMD ["npm", "start"]

EXPOSE 8080