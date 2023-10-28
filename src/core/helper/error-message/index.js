function extractErrorMessage (details) {
  console.log('details : ', details)

  const errorMessage = {}

  details.forEach((singleError) => {
    errorMessage[singleError.context.key] = singleError.message
  })

  return errorMessage
}

module.exports = extractErrorMessage

