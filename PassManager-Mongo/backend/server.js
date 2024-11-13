const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');  // Import CORS

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Pass_Manager';

const app = express();  // Initialize the app
const port = 3000;

app.use(cors());  // Use cors after initializing app
app.use(bodyparser.json());

client.connect(); 

// GET ALL THE PASSWORDS
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Store all the passwords
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
});

// DELETE a password by ID
app.delete('/:id', async (req, res) => {
    const { id } = req.params;  // Get the ID from the URL parameter
    if (!id) {
        return res.status(400).send({ success: false, message: 'ID is required' });
    }

    const db = client.db(dbName);
    const collection = db.collection('Passwords');

    try {
        // Use ObjectId to convert the string ID to a valid MongoDB ObjectId
        const result = await collection.deleteOne({ _id: new ObjectId(id) }); 
        
        if (result.deletedCount === 1) {
            return res.send({ success: true, message: 'Password deleted successfully' });
        } else {
            return res.status(404).send({ success: false, message: 'Password not found' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
