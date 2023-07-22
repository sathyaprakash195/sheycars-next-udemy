import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    rentPerHour: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    addedBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// check if car model is already created
if (mongoose.models.cars) {
  const carModel = mongoose.model("cars");
  mongoose.deleteModel(carModel.modelName);
}

const Car = mongoose.model("cars", carSchema);

export default Car;
