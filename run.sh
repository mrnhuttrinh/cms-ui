#!/bin/bash
echo "Start run up cms-ui"
echo "Setup nodejs, docker..."
sudo yum -y install epel-release docker-io
service docker start
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum -y install nodejs
echo "Finish setup node, docker"
echo "Setup project"
npm install
npm run build
echo "Finish setup project"
echo "Docker build"
docker build --rm=true -t ecash/cms-ui:1.0 .
docker run -d -t -p 8080:8080  ecash/cms-ui:1.0
