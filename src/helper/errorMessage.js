function extractErrorMessage (details) {
  const errorMessage = {}

  details.forEach((singleError) => {
    errorMessage[singleError.path[0]] = singleError.message
  })

  return errorMessage
}

module.exports = {
  extractErrorMessage
}
