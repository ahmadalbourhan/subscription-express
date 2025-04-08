import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const names = users.map((user) => user.name);

    // res.status(200).json({ success: true, data: users });
    res.status(200).json({ success: true, data: names });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // Check if the user is trying to access their own data
    // This didn't allowing any authenticated user to fetch any user's data without checking if they are trying to access their own data
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to access this user's data",
      });
    }

    // Find the user by ID, excluding the password
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
