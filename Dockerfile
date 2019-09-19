FROM node:11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g nodemon
EXPOSE 3000
CMD [ "yarn", "start" ]

