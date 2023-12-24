const multer = require('multer')
const { multerStorageConfig } = require('./../../config/multer')
const createHttpError = require('http-errors')

// Create a multer instance with the storage configuration
const uploadProfileMiddleWare = multer({
  storage: multerStorageConfig,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if (!file.mimetype.startsWith('image/')) {
      cb(createHttpError(500, 'there is error in request validator middleware'), false)
    }
    // If it's an image, accept it
    cb(null, true)
  }
})

module.exports = uploadProfileMiddleWare
