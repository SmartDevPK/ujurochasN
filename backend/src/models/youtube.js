import mongoose from "mongoose";

const youtubeSchema = new mongoose.Schema({
    youtubeLink: String,
});

const YoutubeItem = mongoose.model("YoutubeItem", youtubeSchema);

export default YoutubeItem;