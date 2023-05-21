const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.vgqrech.mongodb.net/?retryWrites=true&w=majority`;

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

        const toysCollection = client.db('marvelousDB').collection('toys');


        // get data for sub category
        app.get('/alltoys', async (req, res) => {
            console.log(req.query)
            let query = {}
            req.query && req.query.subCategory ? query ={ subCategory: req.query.subCategory}: query = {email: req.query.email}
            
            const result = await toysCollection.find(query).toArray();

            res.send(result);
        })

        // get data by id 

        app.get('/alltoys/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await toysCollection.findOne(query);
            res.send(result)
        })
        // get data for showing data for individual user 
      

        app.post('/alltoys', async (req, res) => {

            const booking = req.body;
            console.log(booking)
            const result = await toysCollection.insertOne(booking)
            res.send(result);
        })

        app.patch('/alltoys/:id', async (req, res) => {
            const id = req.params.id;
            const updatedetails = req.body;
            const filter = { _id: new ObjectId(id) }
            const updateDet = {
                $set: {
                    price: updatedetails.price,
                    quantity: updatedetails.quantity,
                    description: updatedetails.description
                },
            };
            const result = await toysCollection.updateOne(filter, updateDet)
            res.send(result);
        })

        app.delete('/alltoys/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await toysCollection.deleteOne(query);
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('marvelous toys server')
})

app.listen(port)