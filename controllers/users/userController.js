const userModel = require("../../models/userModel");
const requestHandler = require("../../utils/requestHandler");
const cloudinary = require("../../middlewares/cloudinaryHandler");

async function handleGetUserList(req, res) {
  try {
    const users = await userModel.getUsers();
    return requestHandler.success(res, 200, "Users fetched successfully", {
      users,
    });
  } catch (error) {
    return requestHandler.error(res, 500, `Server error ${error.message}`);
  }
}
async function handleGetSingleUser(req, res) {
  const { id } = req.params;
  const { email, username } = req.body;
  let searchQuery;
  if (id) {
    searchQuery = { id };
  }
  if (email) {
    searchQuery = { email };
  }
  if (username) {
    searchQuery = { username };
  }
  try {
    const user = await userModel.getSingleUser(searchQuery);
    if (user) {
      return requestHandler.success(res, 200, "User fetched successfully", {
        user,
      });
    }
    return requestHandler.error(
      res,
      400,
      `User with ${searchQuery} does not exist`
    );
  } catch (error) {
    return requestHandler.eror(res, 500, `server error ${error.message}`);
  }
}
