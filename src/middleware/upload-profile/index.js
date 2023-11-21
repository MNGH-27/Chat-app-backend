const multer = require('multer')
const path = require('path')

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored for each user
    const userUploadsDir = path.join('./src/uploads', `${req.body.userName}`)

    // Create the directory if it doesn't exist
    require('fs').mkdirSync(userUploadsDir, { recursive: true })

    // Specify the directory where uploaded files will be stored
    cb(null, userUploadsDir)
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
      const error = new Error('Only image files are allowed.')
      error.status = 422
      return cb(error)
    }
    // If it's an image, accept it
    cb(null, true)
  }
})

module.exports = uploadProfileMiddleWare
