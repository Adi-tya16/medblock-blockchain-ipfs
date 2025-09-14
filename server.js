// 1. Import Dependencies
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// 2. Initialize
const app = express();
const port = process.env.PORT || 3001; // Use a different port from your frontend
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

// 3. Set up Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Multer setup for handling file uploads
// We'll save files temporarily to an 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// +++ Add this new route handler +++
// 4. Define a root endpoint to confirm the server is running
app.get('/', (req, res) => {
    res.send('Backend server is running and ready to receive uploads!');
});

// 5. Define the API Endpoint for file uploads
// This matches the '/api/upload' endpoint your frontend is calling
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Create a readable stream from the uploaded file's path
        const readableStreamForFile = fs.createReadStream(req.file.path);

        const options = {
            pinataMetadata: {
                name: req.file.originalname, // Use original file name
                keyvalues: {
                    uploadedBy: 'MyApp'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        // Pin the file to IPFS
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        
        // Clean up the temporarily saved file
        fs.unlinkSync(req.file.path);

        // Send the IPFS hash back to the frontend
        res.status(200).json({
            message: "File uploaded successfully to IPFS!",
            IpfsHash: result.IpfsHash
        });

    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        res.status(500).json({ message: "An error occurred during file upload." });
    }
});

// 6. Start the Server
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});