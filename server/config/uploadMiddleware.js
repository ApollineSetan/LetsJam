import multer from 'multer';
import multers3 from 'multer-s3';
import s3Client from './s3Client.js';

const upload = multer({
  storage: multers3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
   fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and audio files are allowed!'), false);
    }
  },
});

export default upload;
