function generateFileLink(userName, fileName) {
  return `http://localhost:5000/files/${userName}/${fileName}`
}

module.exports = generateFileLink
