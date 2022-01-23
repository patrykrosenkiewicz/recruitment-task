#!/bin/bash
while getopts t: flag
do
    case "${flag}" in
        t) TYPE=${OPTARG};;
    esac
done

FILE_FOR_TEST="data/dbTest.json"
ORIG_DB_FILE="data/db.json"
DB_FILE_BACKUP="data/dbBackup.json"

if [ "$TYPE" = "setup-test" ]; then
    `cp $ORIG_DB_FILE $DB_FILE_BACKUP`
    `rm $ORIG_DB_FILE`
    `cp $FILE_FOR_TEST $ORIG_DB_FILE`
elif [ "$TYPE" = "cleanup-test" ]; then
    `rm $ORIG_DB_FILE`
    `cp $DB_FILE_BACKUP $ORIG_DB_FILE`
fi
