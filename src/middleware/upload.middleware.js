
const multer = require('multer')

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars') // Directory where avatar images will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the avatar
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

module.exports = multer({ storage: storage })

