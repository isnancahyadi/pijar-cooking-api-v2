const response = (statusCode, stat, message, payload, res) => {
  res.status(statusCode).json({
    status: stat,
    message: message,
    ...(payload && { payload: payload }),
  });
};

module.exports = response;
