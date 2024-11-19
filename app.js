const tesseract = require('tesseract.js')
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const parseKTP = require('./helpers/parseKTP');

const app = express();

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary folder for uploaded files

// Endpoint to handle file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    console.log('masuk?')

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const inputPath = req.file.path;
    const outputFilename = `${req.file.filename}-processed.jpg`;
    const outputPath = path.join('uploads', outputFilename);

    try {
        console.log('processing image')

        // Process the image with sharp
        await sharp(inputPath)
            .grayscale() // Convert to grayscale
            .threshold(150) // Apply binary thresholding
            .resize({ width: 1200 }) // Resize for better clarity
            .toFile(outputPath);

        console.log('recognizing image');
        const response = await tesseract.recognize(outputPath, 'ind', {
            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,-./ ',
        })

        console.log('ini response')
        console.log(parseKTP(response.data.text))

        await fs.unlink(inputPath); // Deletes the input file
        console.log('Input file deleted successfully.');

        await fs.unlink(outputPath); // Deletes the processed file
        console.log('Processed file deleted successfully.');

        return res.status(200).json({
            message: 'Image uploaded and processed successfully.',
            result: parseKTP(response.data.text),
        });
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Error processing image.' });
    }
});

// Serve processed images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
