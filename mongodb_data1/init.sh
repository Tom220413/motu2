#!/bin/bash

mongo <<EOF
use admin
db.createUser({
  user: "$MONGO_INITDB_ROOT_USERNAME",
  pwd: "$MONGO_INITDB_ROOT_PASSWORD",
  roles: [
    {
      role: "root",
      db: "admin"
    }
  ]
})
use motu2
db.createCollection("prefecture")
db.createCollection("users")
EOF

mongoimport --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --db motu2 --collection prefecture --drop --file ./prefecture.json --jsonArray
mongoimport --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --db motu2 --collection users --drop --file ./users.json --jsonArray
mongoimport --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --db motu2 --collection store --drop --file ./store.json --jsonArray
mongoimport --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --db motu2 --collection review --drop --file ./review.json --jsonArray

