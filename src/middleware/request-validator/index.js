
//* middlewares/Validator.js
const createHttpError = require('http-errors')

//* Include all validators
const Validators = require('./../../core/validators')

const extractErrorMessage = require('./../../core/helper/error-message')

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        return res.status(422).send({
          errors: extractErrorMessage(err.details)
        })
      }

      next(createHttpError(500))
    }
  }
}
