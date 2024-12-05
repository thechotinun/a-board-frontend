FROM node:20-alpine

#set ENV

ARG APP_ID
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

ENV APP_ID=$APP_ID
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# set working directory

RUN mkdir -p /usr/src/app
 
WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install --force

COPY . .

# build app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]