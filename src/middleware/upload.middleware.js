
const multer = require('multer')

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // Define how uploaded files will be named
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// Create a multer instance with the storage configuration
const uploadProfileMiddleWare = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
  // Check if the file is an image
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'))
    }
    // If it's an image, accept it
    cb(null, true)
  }
})

module.exports = { uploadProfileMiddleWare }

