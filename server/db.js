require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://cry004:${process.env.PASSWORD}@cluster0.djyudka.mongodb.net/housedata?retryWrites=true&w=majority&appName=Cluster0`;

let dbConnection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(url)
        .then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch(err=>{
            console.log(err)
            return callback(err);
        });
    },
    getdb: () =>dbConnection
}