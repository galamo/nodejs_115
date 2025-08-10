import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import multer from "multer"
import path from "path"
dotenv.config()
const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

router.post('/', upload.single('file'), (req, res) => {
    console.log('Uploaded file:', req.file);
    res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
});

export default router;