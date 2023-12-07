const multer = require('multer')
const path = require('path')

// Define the storage for uploaded files
const multerStorageConfig = multer.diskStorage({
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

module.exports = multerStorageConfig
