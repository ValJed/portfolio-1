#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  echo $PROJECT_ROOT
  echo $BUILD_ENV

  cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "aurore-grondin" ]; then
    npm install && npm run build
  elif [ "$BUILD_ENV" = "api" ]; then
    npm install
  else
    echo "Error: no build config for INATO_BUILD_ENV value '$INATO_BUILD_ENV'"
    exit 1
  fi
)