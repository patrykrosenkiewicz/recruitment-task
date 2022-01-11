#!/bin/bash

FILE=data/dbTest.json
if [ ! -f "$FILE" ]; then
    echo `ls`
    `cp data/db.json $FILE`
else
    `rm $FILE`
    `cp data/db.json $FILE`
fi
