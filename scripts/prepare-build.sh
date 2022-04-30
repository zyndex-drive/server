#!/usr/bin/env bash

echo "Removing Old Build Files"
cd dist
rm -rf *
rm -rf .yarn
rm .gitignore
rm .yarnrc.yml
cd ..

echo "Building Typescript Files"
yarn build:tsc
cp -r ./out/* ./dist

echo "Doing Some Miscellaneous things to make build ready"
cd dist
mkdir .yarn

cp ../package.json ./
cp ../yarn.lock ./
cp ../.yarnrc.yml ./
cp ../README.md ./
cp ../LICENSE ./
cp ../app.json ./
cp ../Dockerfile ./
cp ../docker-compose.yml ./
cp ../.gitignore ./
cp ../CHANGELOG.md ./
cp -r ../.yarn/plugins ./.yarn/
cp -r ../.yarn/releases ./.yarn/

echo "Pushing into Repo"
git add .
git commit -m "release: $1"
git tag -s -a "$1" -m "release: $1"
git push --follow-tags origin master

echo "Cleaning Directory"
cd ..
rm -rf ./out

