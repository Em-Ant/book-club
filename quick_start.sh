#!/bin/bash

##
#  QUICK APP START SCRIPT
#

console="xfce4-terminal";


# Works only if in a terminal
tty -s;
if [ $? -eq 0 ];
  then

  # Start DB in another terminal
  $console -e "./mongod";

  # Source nvm
  . ~/.nvm/nvm.sh;

  # Load NodeJS and Start Express Server
  if [ -z $1 ];
    then
    NVER="0"; #"stable";
  else
    NVER=$1;
  fi
  nvm use $NVER;
  NODE_PATH=`which node`;
  NODE_PATH=${NODE_PATH/bin\/node/lib\/node_modules};
  export NODE_PATH; #:~/.nvm/versions/node/[NODE_VERSION]/lib/node_modules

  grunt serve;
fi
