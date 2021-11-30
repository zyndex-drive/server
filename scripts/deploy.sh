#!/usr/bin/env bash

echo "Building Typescript Files"
yarn build:tsc

echo "Doing Some Miscellaneous things to make build ready"
cd dist
mkdir .yarn

cp ../package.json ./
cp ../yarn.lock ./
cp ../.yarnrc.yml ./
cp -r ../.yarn/plugins ./.yarn/
cp -r ../.yarn/releases ./.yarn/

echo "Installing Production Dependencies"
yarn workspaces focus --production

echo "Ready to Rock!"
echo "type > 'yarn serve' to start the server"