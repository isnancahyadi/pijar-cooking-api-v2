const response = require("../utils/response");

const paginate = (req, res, data) => {
  const page = parseInt(req?.query?.page ?? 1);
  const limit = parseInt(req?.query?.limit ?? 5);
  const totalPage = Math.ceil(data.length / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let result = {};

  if (startIndex > 0) {
    result.prev_page = page - 1;
  }

  if (endIndex < data.length) {
    result.next_page = page + 1;
  }

  if (startIndex < 0 || page > totalPage) {
    res.status(404).json({
      status: "ERROR",
      message: "Page not found",
    });
    return false;
  }

  return (result = {
    ...result,
    current_page: page,
    tota_page: totalPage,
    total_data: data.length,
    metadata: data.slice(startIndex, endIndex),
  });
};

module.exports = paginate;
