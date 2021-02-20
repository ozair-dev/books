require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const ObjectID = require('mongodb').ObjectID
const myDB = require("./connection")
process.env.MONGO_URI="mongodb://ozair_ayaz:ozair_03235146562@cluster0-shard-00-00.dk3yt.mongodb.net:27017,cluster0-shard-00-01.dk3yt.mongodb.net:27017,cluster0-shard-00-02.dk3yt.mongodb.net:27017/books?ssl=true&replicaSet=atlas-11pcwg-shard-0&authSource=admin&retryWrites=true&w=majority"
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use("/public",express.static(__dirname+"/public"))
app.use(cors())

myDB(async (client) => {
	const myDataBase = await client.db('books').collection('books');
   
   	app.route("/create").post((req,res)=>{
   		let data = req.body
   		for(let i in data){
   			if(data[i]==undefined) return res.status(404).text(data[i])
   		}
   		myDataBase.find({name: data.name}).toArray((err, arr)=>{
   			if(arr[0]){
   				return res.status(404).type('text').send("exists")
   			}
   			else{
   				myDataBase.insertOne(data, (err, data)=>{
   					return res.send(data)
   				})
   			}
   		})
   	})

	app.route("/all").get((req, res)=>{
		myDataBase.find({}).toArray((err, data)=>{
			if(err) return res.status(404).send(err);
			res.send(data)
		})
	})

	app.route("/delete").post((req, res)=>{
		myDataBase.deleteOne({_id: new ObjectID(req.body._id)}, (err, data)=>{
			if(err) return res.status(404).send(err);
			res.send("Done")
		})
	})

	app.route("/update").put((req, res)=>{
		let data = req.body
		let id = data._id;
		delete data._id;
		myDataBase.findOneAndUpdate({_id: new ObjectID(id)}, {$set: data}, {returnOriginal: false, upsert: true}, (err, data)=>{
			res.send(data.value)
		})
	})

   if (process.env.NODE_ENV === 'production') {
       app.use(express.static('client/build'));
   }

  }).catch((e)=>{
    console.log(e.message)
})

app.listen(process.env.PORT||4000, ()=>{
   console.log("Listening on port"+process.env.PORT)
})