FROM node:latest
COPY ./ /home/node/homesono_front
WORKDIR /home/node/homesono_front
RUN npm install
# USER node
CMD npx ionic serve
