const express = require('express');
const cors = require('cors')
//初始化
const app = express();
app.use(cors())
const { connectToDb, getdb } = require('./db');
let db;

app.use(express.json())

connectToDb((err) => {
    if (!err) {
        app.listen(3001, () => {
            console.log('Server is running')
        });
        db = getdb();
    }
});
//Fetch all 
app.get('/api/houses', (req, res) => {
    const page = req.query.p || 0;
    const pageSize = 50;
    let houses = [];
    let totalcount;
    
    const articles = db.collection('adver').aggregate([
    {
        $facet: {
        metadata: [{ $count: 'totalCount' }],
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
    },
    ]);
   
    // db.collection('adver').find()
    // .limit(5)
    // .toArray()
    // .then((re) => {
    //     res.status(200).json({
    //         total: re,
    //     })
    // })
    db.collection('adver').find()
    .sort({ id: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .forEach(h => houses.push(h))
    .then(() => {
        res.status(200).json(houses)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error getting house ads' })
    })
})
//Fetch one
app.get('/api/houses/:id', (req, res) => {
    const houseID = req.params.id
    if (!isNaN(houseID)) {
        db.collection('adver')
            .findOne({ id: houseID }, { projection: { _id: 0} })
            .then((house) => {
                if (house) {
                    res.status(200).json(house)
                } else {
                    res.status(404).json({ mssage: "house ad not found" })
                }
            })
            .catch(() => {
                res.status(500).json({ message: "Can't get house ad info" })
            })
    } else {
        res.status(400).json({ Error: "Error: ID must be a number" })
    }
})
// Create new ad
app.post('/api/houses', (req, res) => {
    const house = req.body
    db.collection('adver')
        .insertOne(house)
        .then((result) => {
            res.status(201).json({ result })
        })
        .catch(() => {
            res.status(500).json({ message: "Error creating house ad" })
        })
})
//Update an ad
app.patch('/api/houses/:id', (req, res) => {
    const house = req.body
    const houseID = req.params.id
    if (!isNaN(houseID)) {
        db.collection('adver')
        .updateOne(
            {id: houseID},
            {$set: house}
        )
        .then((result)=> {
            res.status(200).json({ result })
        })
        .catch(()=>{
            res.status(500).json({ message: "Error updating house ad" })
        })
    }else{
        res.status(400).json({ Error: "Error: ID must be a number" })
    }

})
//Delete an ad
app.delete('/api/houses/:id', (req, res) => {
    const houseID = req.params.id
    if(!isNaN(houseID)) {
        db.collection('adver')
        .deleteOne({id: houseID})
        .then((result)=> {
            res.status(200).json({result})  //204 = delete successfully
        })
        .catch(()=> {
            res.status(500).json({message: 'Error deleting house ad'})
        })
    }else{
        res.status(400).json({ Error: "Error: ID must be a number" })
        
    }
})
