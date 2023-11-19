const requestValidatorMiddleWare = require('./request-validator')
const tokenAuthenticationMiddleWare = require('./token-authentication')
const uploadProfileMiddleWare = require('./upload-profile')
module.exports = { requestValidatorMiddleWare, tokenAuthenticationMiddleWare, uploadProfileMiddleWare }
