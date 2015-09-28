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
  nvm use 0 && grunt serve;

fi
