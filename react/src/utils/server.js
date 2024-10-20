// express stuff
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import multer from 'multer';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('API server running');
});

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads', // Adjust the destination if needed
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`); 
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
        if (!file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }
        const filename = file.filename;
        const filePath = `./uploads/${filename}`;

        // Store file data in MongoDB
        const result = await collection.insertOne({ filename, filePath });

        res.json({ success: true, message: 'File uploaded successfully', data: result.insertedId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, error: 'Error uploading file' });
    }
});

// Test server and MongoDB connection
app.listen(5050, async () => {
    console.log('Server listening on port 5050');
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        await client.db("hackohio").command({ ping: 1 });
        console.log("Pinged your MongoDB deployment, connected successfully!");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
});
