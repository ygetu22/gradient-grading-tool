// express stuff
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { MongoClient } from "mongodb";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Api server thing');
});

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads', // Adjust the destination as needed
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}.${file.originalname}`);  

        },
    }),
});

// Handle file uploads
app.post('/upload-answer-key', upload.single('file'), async (req, res) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db('hackohio');
        const collection = db.collection('answerKeys');

        // Extract file data
        const file = req.file;
        const filename = file.filename;
        const filePath = `./uploads/${filename}`; // Adjust the path if needed

        // Store file data in MongoDB
        const result = await collection.insertOne({ filename, filePath });

        res.json({ success: true, message: 'File uploaded successfully', data: result.insertedId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, error: 'Error uploading file' });
    }
});
app.listen(3000, async () => {
		console.log('Mongo URI:', process.env.MONGO_URI);
    const client = new MongoClient(process.env.MONGO_URI);

    try {
        await client.connect();
        await client.db("hackohio").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }

    console.log('Example app listening on port 3000!');
});
