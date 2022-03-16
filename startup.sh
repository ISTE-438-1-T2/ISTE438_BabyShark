#! /usr/bin/bash

ps aux | grep node | awk '{print $2}' | xargs -n1 | xargs kill -9 $1

nohup nodemon --exec npm run server &

nohup nodemon --exec npm run client &