#!/bin/bash

export PORT=7000

cd ~/www/newtasktracker
./bin/newtasktracker stop || true
./bin/newtasktracker start

