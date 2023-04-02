#!/bin/bash

docker image build -t incentive-client .

echo  build finished

sleep 1



docker run --name incentive-client -d -p 65132:3000 incentive-client
sleep 1

echo  run finished

docker ps