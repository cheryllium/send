#!/bin/bash

set -e

HERE=`dirname "$(readlink -f "$0")"`

echo $HERE

if [ "$(docker images | grep 'firefox-send')" == "" ]; then
    docker build -f Dockerfile.dev -t firefox-send $HERE
fi

if [ ! -f '.docker.env.dev' ]; then
    cp .docker.env.example .docker.env.dev
fi

docker run --env-file .docker.env.dev -it -v $HERE:/app -p 4001:4001 "$@" firefox-send
