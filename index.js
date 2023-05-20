const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();



// middleware

app.use(express.json());
app.use(cors());

// mongodb start

// nuNNOaSFZr1NzD2q
//marvelous_toy_admin 



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.vgqrech.mongodb.net/?retryWrites=true&w=majority"`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();

        const toysCollection = client.db('marvelousDB').collection('toys')

        // get all the data from DB for initial datas

        app.get('/alltoys', async (req, res) => {
            console.log(req.query)
            let query = {}
            if(req.query.subCategory){
                query = {subCategory: req.query.subCategory}
            }
            const result = await toysCollection.find(query).toArray();

            res.send(result);
        })


        // get data by id


        app.get('/alltoys/:id', async (req, res) => {
      const id = req.params.id
      const query = new ObjectId(id)
            const result = await toysCollection.find(query).toArray();
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {

    res.send('welcome to my marvelous toys server')
})

app.listen(port);