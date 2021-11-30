#!/usr/bin/env bash

javascript-obfuscator ./out --output ./dist --target=node --compact=true --string-array=true --string-array-rotate=true --string-array-shuffle=true --numbers-to-expressions=true --simplify=true --split-strings=true --split-strings-chunk-length=5