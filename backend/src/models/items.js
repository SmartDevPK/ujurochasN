import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // Array of image URLs
    validate: {
      validator: function (images) {
        console.log("Validating images:", images); // Debugging
        return images.length <= 4; // Ensure no more than 4 images
      },
      message: "You can upload a maximum of 4 images.",
    },
    required: true,
  },
});;

const Item = mongoose.model("Item", ItemSchema);
export default Item;