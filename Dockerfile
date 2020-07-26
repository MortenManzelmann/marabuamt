FROM node:11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g nodemon yarn 
RUN yarn
EXPOSE 3000
CMD [ "npm", "start" ]
