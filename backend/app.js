import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/db.user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import methodOverride from "method-override";
import routeuse from "./src/routes/route.user.js";
import Item from "./src/models/items.js";
import YoutubeLink from "./src/models/youtube.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors({ 
    origin: "http://localhost:9000",
    origin: "http://deploy-mern-link.vercel.app",
    credentials: true, 
})); // Allow frontend to access the API

// Set view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

// Static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("", routeuse);

// Fetch Items
app.get("/items", async (req, res) => {
    try {
        // Fetch data from the Item model
        const itemData = await Item.find({});

        // Send item data to the frontend
        res.status(200).json({ itemData });
    } catch (error) {
        console.error("Error fetching item data:", error);
        res.status(500).json({ message: "Error fetching item data", error });
    }
});

// Fetch YouTube Links
app.get("/youtubeLinks", async (req, res) => {
    try {
        const youtubeData = await YoutubeLink.find();
        res.status(200).json({ youtubeData });
    } catch (error) {
        console.error("Error fetching YouTube link data:", error);
        res.status(500).json({ message: "Error fetching YouTube link data", error });
    }
});
// Start the server
(async () => {
    try {
        await connectDB();
        console.log("MongoDB connection successful");

        const PORT = process.env.PORT || 6000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
})();
