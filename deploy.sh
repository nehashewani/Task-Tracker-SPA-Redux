#!/bin/bash

export PORT=7000
export MIX_ENV=prod
export GIT_PATH=/home/memory/newtasktracker 

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "memory" ]; then
	echo "Error: must run as user 'memory'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/newtasktracker ]; then
	echo mv ~/www/newtasktracker ~/old/$NOW
	mv ~/www/newtasktracker ~/old/$NOW
fi

mkdir -p ~/www/newtasktracker
REL_TAR=~/newtasktracker/_build/prod/rel/newtasktracker/releases/0.0.1/newtasktracker.tar.gz
(cd ~/www/newtasktracker && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/memory/newtasktracker/start.sh
CRONTAB

#. start.sh
