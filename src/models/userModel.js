import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// check if user model is already created
if (mongoose.models.users) {
  const userModel = mongoose.model("users");
  mongoose.deleteModel(userModel.modelName);
}

const User = mongoose.model("users", userSchema);

export default User;
