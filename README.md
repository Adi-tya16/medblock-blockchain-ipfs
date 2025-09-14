IPFS File Uploader with Node.js & Pinata

A simple, secure, and modern web application for uploading files to the InterPlanetary File System (IPFS) using Pinata. This project features a sleek front-end and a secure Node.js backend that handles API key management and communication with the Pinata service.

Features
Modern User Interface: A clean, responsive front-end built with HTML and styled with Tailwind CSS.

Secure Backend: A Node.js and Express server that acts as a secure intermediary, protecting your Pinata API keys.

Direct IPFS Upload: Files are securely pinned to IPFS via the Pinata SDK.

Clear User Feedback: The interface provides real-time status updates, including loading indicators and success/error messages.

Easy to Set Up: The project is straightforward to configure and run locally.

Tech Stack
Front-end:

HTML5

Tailwind CSS

Backend:

Node.js

Express.js

Pinata IPFS SDK (@pinata/sdk)

Multer (for file handling)

Dotenv (for environment variable management)

CORS

Project Structure
/my-ipfs-project
|
|-- /my-ipfs-backend
|   |-- /uploads          # Temporary directory for file uploads (can be gitignored)
|   |-- node_modules/
|   |-- .env              # <-- IMPORTANT: Your secret keys go here
|   |-- package.json
|   |-- package-lock.json
|   `-- server.js         # The backend server logic
|
`-- index.html            # The user-facing front-end file

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (which includes npm) installed on your machine.

A Pinata account to get your JWT key.

1. Set Up the Backend
First, navigate into the backend directory and install the necessary dependencies.

# Navigate to the backend folder
cd my-ipfs-backend

# Install NPM packages
npm install

Next, create a .env file in the root of the my-ipfs-backend directory. This file will securely store your Pinata key.

# .env file
PINATA_JWT=YOUR_PINATA_JWT_GOES_HERE

Important: Replace YOUR_PINATA_JWT_GOES_HERE with your actual secret JWT from your Pinata account.

2. Run the Application
You need to have both the backend server and the front-end file open.

A. Start the Backend Server:

In your terminal, from the my-ipfs-backend directory, run:

node server.js

You should see a confirmation message: Backend server is running at http://localhost:3001.

B. Open the Front-end:

Navigate to the root project folder and open the index.html file in your favorite web browser.

How to Use
Ensure your backend server is running.

Open index.html in the browser.

Click "Choose a file" and select the file you wish to upload.

Click the "Upload to IPFS" button.

Watch for the success message and the returned IPFS Hash (CID), which you can use to access your file on any public IPFS gateway.
