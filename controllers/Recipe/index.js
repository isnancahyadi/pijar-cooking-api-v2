const model = require("../../models/recipeModel");
const userModel = require("../../models/userModel");
const response = require("../../utils/response");
const paginate = require("../../middlewares/pagination");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../utils/cloudinary");

const getToken = (req) => {
  const token = req?.headers?.authorization?.slice(6).trim();

  return token;
};

module.exports = {
  // getAllRecipes: async (req, res) => {
  //   try {
  //     const query = await model.getAllRecipes(req?.query?.search);

  //     if (query) {
  //       let dataPaginate = paginate(req, res, query);
  //       if (dataPaginate === false) {
  //         return;
  //       }
  //       response(200, "OK", "Get all data success", dataPaginate, res);
  //       return;
  //     } else {
  //       response(500, "ERROR", "WOW... Something wrong with server", null, res);
  //       return;
  //     }
  //   } catch (error) {
  //     response(400, "ERROR", "Awww... Something wrong...", null, res);
  //     return;
  //   }
  // },

  getAllRecipes: async (req, res) => {
    const { search } = req.query;
    try {
      const query = await model.getAllRecipes();

      const searchRecipe = (data) => {
        return data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      };

      if (query) {
        let data = search ? searchRecipe(query) : query;

        let dataPaginate = paginate(req, res, data);
        if (dataPaginate === false) {
          return;
        }

        response(200, "OK", "Get all data success", dataPaginate, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      console.log(error);
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getNewRecipes: async (req, res) => {
    try {
      const query = await model.getNewRecipes();

      if (query) {
        let dataPaginate = paginate(req, res, query);
        if (dataPaginate === false) {
          return;
        }
        response(200, "OK", "Get all data success", dataPaginate, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getSpecifiedRecipe: async (req, res) => {
    const id = req?.params?.id;

    if (isNaN(id)) {
      response(400, "ERROR", "Hey, What are you doing?", null, res);
      return;
    }

    try {
      const query = await model.getSpecifiedRecipe(id);

      if (query) {
        if (!query.length) {
          response(404, "ERROR", "Recipe not found", null, res);
          return;
        }
        response(200, "OK", "Get data success", query, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getMyRecipes: async (req, res) => {
    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const findUser = await userModel.findUser(username);

      if (findUser) {
        if (!findUser.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          const query = await model.getMyRecipes(username);

          if (query) {
            if (!query.length) {
              response(404, "ERROR", "Recipe not found", null, res);
              return;
            }
          } else {
            response(
              500,
              "ERROR",
              "WOW... Something wrong with server",
              null,
              res
            );
            return;
          }

          let dataPaginate = paginate(req, res, query);
          if (dataPaginate === false) {
            return;
          }
          response(200, "OK", "Get data success", dataPaginate, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getCategory: async (req, res) => {
    try {
      const query = await model.getCategory();

      if (query) {
        response(200, "OK", "SUCCESS", query, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getRecipesByCategory: async (req, res) => {
    const { slug } = req?.params;

    try {
      const query = await model.getRecipesByCategory(slug);

      if (query) {
        if (!query.length) {
          response(404, "ERROR", "Recipe not found", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      let dataPaginate = paginate(req, res, query);
      if (dataPaginate === false) {
        return;
      }
      response(200, "OK", "Get data success", dataPaginate, res);
      return;
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  createRecipe: async (req, res) => {
    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const findUser = await userModel.findUser(username);

      if (findUser) {
        if (!findUser?.length) {
          response(
            404,
            "ERROR",
            { error: { message: "Hey, Who are you?" } },
            null,
            res
          );
          return;
        } else {
          const {
            title,
            ingredients,
            video,
            direction,
            category,
            description,
          } = req?.body;
          const { image } = req?.files;

          let mimeType = image.mimetype.split("/")[1];
          let allowFile = ["jpeg", "jpg", "png", "webp"];

          if (!allowFile?.find((item) => item === mimeType)) {
            response(
              400,
              "ERROR",
              { error: { message: "Hey, What are you doing with image?" } },
              null,
              res
            );
            return;
          }

          if (image.size > 2000000) {
            response(
              400,
              "ERROR",
              { error: { message: "Image is too big" } },
              null,
              res
            );
            return;
          }

          const upload = cloudinary.uploader.upload(image.tempFilePath, {
            folder: "img/recipe",
            public_id: new Date().toISOString(),
          });

          upload
            .then(async (data) => {
              const payload = {
                title,
                ingredients,
                image: data?.secure_url,
                video,
                direction,
                created_by: username,
                category,
                description,
              };

              const query = await model.createRecipe(payload);

              if (query) {
                response(201, "OK", "Recipe has been created", null, res);
                return;
              } else {
                response(
                  500,
                  "ERROR",
                  { error: { message: "WOW... Something wrong with server" } },
                  null,
                  res
                );
                return;
              }
            })
            .catch((error) => {
              response(
                400,
                "ERROR",
                { error: { message: "Awww... Something wrong..." } },
                null,
                res
              );
              return;
            });
        }
      } else {
        response(
          500,
          "ERROR",
          { error: { message: "WOW... Something wrong with server" } },
          null,
          res
        );
        return;
      }
    } catch (error) {
      response(
        400,
        "ERROR",
        { error: { message: "Awww... Something wrong..." } },
        null,
        res
      );
      return;
    }
  },

  deleteRecipe: async (req, res) => {
    const deletedId = req?.params.id;

    if (isNaN(deletedId)) {
      response(400, "ERROR", "Hey, What are you doing?", null, res);
      return;
    }

    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const findUser = await userModel.findUser(username);

      if (findUser) {
        if (!findUser.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          const findRecipe = await model.getSpecifiedRecipe(deletedId);

          if (findRecipe) {
            if (!findRecipe.length) {
              response(404, "ERROR", "Recipe not fund", null, res);
              return;
            } else {
              const query = await model.deleteRecipe(deletedId);

              if (query) {
                response(200, "OK", "Recipe has been deleted", null, res);
                return;
              } else {
                response(
                  500,
                  "ERROR",
                  "WOW... Something wrong with server",
                  null,
                  res
                );
                return;
              }
            }
          } else {
            response(
              500,
              "ERROR",
              "WOW... Something wrong with server",
              null,
              res
            );
            return;
          }
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  updateRecipe: async (req, res) => {
    const {
      params: { id },
      body: { title, ingredients, video, direction },
    } = req;

    if (isNaN(id)) {
      response(400, "ERROR", "Hey, What are you doing?", null, res);
      return;
    }

    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const findUser = await userModel.findUser(username);

      if (findUser) {
        if (!findUser?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          const getSelectedRecipe = await model.getSpecifiedRecipe(id);

          if (getSelectedRecipe) {
            if (!getSelectedRecipe?.length) {
              response(404, "ERROR", "Recipe not found", null, res);
              return;
            }
          } else {
            response(
              500,
              "ERROR",
              "WOW... Something wrong with server",
              null,
              res
            );
            return;
          }

          const payload = {
            title: title ?? getSelectedRecipe[0].title,
            ingredients: ingredients ?? getSelectedRecipe[0].ingredients,
            video: video ?? getSelectedRecipe[0].video,
            direction: direction ?? getSelectedRecipe[0].direction,
          };

          const query = await model.updateRecipe(id, username, payload);

          if (query) {
            response(201, "OK", "Recipe has been updated", null, res);
            return;
          } else {
            response(
              500,
              "ERROR",
              "WOW... Something wrong with server",
              null,
              res
            );
            return;
          }
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  updateImageRecipe: async (req, res) => {
    const { id } = req?.params;
    const { image } = req?.files ?? {};

    if (isNaN(id)) {
      response(400, "ERROR", "Hey, What are you doing?", null, res);
      return;
    }

    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const findUser = await userModel.findUser(username);

      if (findUser) {
        if (!findUser?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          const getSelectedRecipe = await model.getSpecifiedRecipe(id);

          if (getSelectedRecipe) {
            if (!getSelectedRecipe?.length) {
              response(404, "ERROR", "Recipe not found", null, res);
              return;
            }
          } else {
            response(
              500,
              "ERROR",
              "WOW... Something wrong with server",
              null,
              res
            );
            return;
          }

          let mimeType = image.mimetype.split("/")[1];
          let allowFile = ["jpeg", "jpg", "png", "webp"];

          if (!allowFile?.find((item) => item === mimeType)) {
            response(
              400,
              "ERROR",
              "Hey, What are you doing with image?",
              null,
              res
            );
            return;
          }

          if (image.size > 2000000) {
            response(400, "ERROR", "Image is too big", null, res);
            return;
          }

          const upload = cloudinary.uploader.upload(image.tempFilePath, {
            folder: "img/recipe",
            public_id: new Date().toISOString(),
          });

          upload.then(async (data) => {
            const payload = {
              image: data?.secure_url,
            };

            const query = await model.updateImageRecipe(id, username, payload);

            if (query) {
              response(201, "OK", "Image recipe has been updated", null, res);
              return;
            } else {
              response(
                500,
                "ERROR",
                "WOW... Something wrong with server",
                null,
                res
              );
              return;
            }
          });
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },
};
