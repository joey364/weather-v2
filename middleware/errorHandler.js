const errorHandler = async (error, _req, res, next) => {
  if (res.headerSent) {
    next(error)
  }

  res.status(500).json({
    success: false,
    error: error.message || 'Server error',
    stack: process.env.NODE_ENV !== 'production' ? undefined : error.stack
  })
}

module.exports = errorHandler
