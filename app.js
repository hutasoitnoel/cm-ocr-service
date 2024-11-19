const tesseract = require('tesseract.js');
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const parseKTP = require('./helpers/parseKTP');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        console.log('Processing image in memory');

        // Process the image using Sharp
        const processedBuffer = await sharp(req.file.buffer)
            .grayscale()
            .threshold(150)
            .resize({ width: 1200 })
            .toBuffer();

        console.log('Recognizing image');
        const response = await tesseract.recognize(processedBuffer, 'ind', {
            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,-./ ',
        });

        console.log('OCR Result:');
        console.log(response.data.text)
        console.log(parseKTP(response.data.text));

        return res.status(200).json(parseKTP(response.data.text));
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Error processing image.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
