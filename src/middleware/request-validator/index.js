//* middlewares/Validator.js
const createHttpError = require('http-errors')

//* Include all validators
const Validators = require('./../../utils/validators')
const { extractJoiErrorMessage } = require('./../../utils/helper')

function requestValidatorMiddleWare(validator) {
  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body, { abortEarly: false })

      req.body = validated
      next()
    } catch (err) {
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        return res.status(422).send({
          errors: extractJoiErrorMessage(err.details)
        })
      }

      next(createHttpError(500, 'there is error in request validator middleware'))
    }
  }
}

module.exports = requestValidatorMiddleWare
