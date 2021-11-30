#!/usr/bin/env bash

echo "Installing Dependencies for Building"
yarn --immutable

echo "Building Typescript Files"
yarn build:tsc

echo "Doing Some Miscellaneous things to make build ready"
cd dist
mkdir .yarn .yarn/plugins .yarn/releases

cp ../package.json ./
cp ../.yarnrc.yml ./
cp -r ../.yarn/plugins ./.yarn/plugins
cp -r ../.yarn/releases ./.yarn/releases