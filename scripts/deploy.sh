#!/usr/bin/env bash

echo "Building Typescript Files"
yarn build

echo "Doing Some Miscellaneous things to make build ready"
cd dist
mkdir .yarn .yarn/plugins .yarn/releases

cp ../package.json ./
cp ../.yarnrc.yml ./
cp ../.yarn/plugins ./.yarn/plugins
cp ../.yarn/releases ./.yarn/releases

echo "Installing Production Dependencies"
yarn workspaces focus --production

echo "Ready to Rock!"
echo "type > 'yarn serve' to start the server"