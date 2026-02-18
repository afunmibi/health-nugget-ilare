import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.UPLOAD_PORT || 3002;

app.use(cors());

const uploadRoot = path.join(process.cwd(), 'public', 'uploads');

const resolveFolder = (type) => {
  if (type === 'video') return 'video';
  if (type === 'audio') return 'audio';
  if (type === 'image') return 'images';
  return 'misc';
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = resolveFolder(req.body.type);
    const target = path.join(uploadRoot, folder);
    fs.mkdirSync(target, { recursive: true });
    cb(null, target);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${safeName}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const folder = resolveFolder(req.body.type);
  const publicPath = `/uploads/${folder}/${req.file.filename}`;

  return res.json({ path: publicPath });
});

app.listen(port, () => {
  console.log(`Upload server listening on ${port}`);
});