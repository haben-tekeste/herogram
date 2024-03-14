import multer from "multer";

const storage = multer.memoryStorage();
const fileFilter = (
  req,
  file,
  callback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" || 
    file.mimetype === "video/mp4"
  ) {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  } else {
    callback(null, false);
  }
};

const multerUploads = multer({storage, fileFilter}).single('image')

export {multerUploads}