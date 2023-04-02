FROM node:16.18.0
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY . /usr/src/app
RUN npm install --legacy-peer-deps
RUN npm install react-scripts -g

# start app
CMD ["npm", "start"]