const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/uploads/'),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, '_');
      const uniqueName = `${Date.now()}_${cleanName}`;
      cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  if(["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false)
  }
}
const upload = multer({storage, fileFilter});

module.exports = upload;