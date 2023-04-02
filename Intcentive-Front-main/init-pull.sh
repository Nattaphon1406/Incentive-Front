#!/bin/bash

docker stop incentive-client 

echo  stop finished

sleep

docker rm incentive-client 

echo  rm finished

sleep 1

docker rmi incentive-client 

echo  rmi finished


git stash && git pull && git stash drop stash@{0} 

echo  git stash && git pull finished

sleep 1

docker image build -t incentive-client .

echo  build finished

sleep 1

docker run --name incentive-client -d -p 65132:3000 incentive-client 
sleep 1

echo  run finished

docker ps