#!/bin/bash

#download node and npm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install --lts
# npm install express
# node server.js
npm start

#create our working directory if it doesnt exist
DIR="/home/ec2-user/react"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi
