const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000; // Ubah port di sini jika diperlukan

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join('public', 'uploads');
    console.log('Destination Path:', destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Rute untuk mengunggah file
app.post('/upload', upload.single('berkas'), (req, res) => {
  if (!req.file) {
    console.log('No file uploaded.');
    return res.status(400).json({ error: 'No file uploaded.' }); // Mengirim respons dalam format JSON
  }
  console.log('File uploaded successfully:', req.file);
  res.json({ fileName: req.file.filename, filePath: `/uploads/${req.file.filename}` });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
