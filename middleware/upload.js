
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const nombreArchivo =
            Date.now() + '-' +
            Math.round(Math.random() * 1E9) +
            extension;

        cb(null, nombreArchivo);
    }
});

const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes JPG, PNG o WEBP'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;
