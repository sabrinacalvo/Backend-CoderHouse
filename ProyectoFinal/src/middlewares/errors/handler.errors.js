const EnumError = require('../../utils/errors/enums.error')

module.exports = (error, req, res, next) => {
  console.log(error.cause)

  switch (error.code) {
    case EnumError.INVALID_TYPES_ERROR:
      res.json({ error: error.name })
      break

    default:
      res.json({ error: 'Unhandled error' })
  }
}