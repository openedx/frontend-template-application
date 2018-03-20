# Copied from https://github.com/BretFisher/node-docker-good-defaults/blob/master/Dockerfile

FROM node:8.9.3

# Create app directory
RUN mkdir -p /edx/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 1991

WORKDIR /edx
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install
ENV PATH /edx/app/node_modules/.bin:$PATH

WORKDIR /edx/app
COPY . /edx/app

CMD [ "npm", "run", "start" ]
