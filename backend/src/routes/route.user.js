import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import upload from "../routes/multerConfig.js";
import youtubeLink from "../models/youtube.js";
// Import controllers
import { 
    renderHomePage, 
    handleSignup, 
    loginPage, 
    loginUser, 
    forgotPassword,
    resetPassword, 
    forgotPasswordPage,
    resetPasswordPage,
    imagePage,
    imagePost,
    viewAdminPage,
    updateItem,
    editItemPage,
    renderYoutubePage,
    youtubePost,
    renderUpdateYoutube,
    processUpdateYoutube,
    logoutUser,
    deleteYoutubeLink,
    deleteItem,
} from "../controllers/controllers.user.js";

const router = express.Router();

// ==========================  Home Route ========================== //
router.get("/", renderHomePage);

// ==========================  Authentication Routes ========================== //
router.get("/login", loginPage);
router.post("/login", loginUser);
router.post("/signup", handleSignup);

// ==========================  Admin Routes ========================== //
router.get("/admin", imagePage);
router.post("/admin", upload.array("images", 4), imagePost);
router.get("/view-admin", viewAdminPage);

// ========================== Update Route ============================//
router.get("/update-admin/:id", editItemPage);
router.post("/update-admin/:id", upload.array("images", 4), updateItem);

// ==========================  Password Reset Routes ========================== //
router.get("/forgotPassword", forgotPasswordPage);
router.post("/forgotPassword", forgotPassword);
router.get("/reset-password/:token", resetPasswordPage);
router.post("/reset-password/:token", resetPassword);

// ========================= Youtube page ======================================//

router.get("/youtube", renderYoutubePage);
router.post("/youtube", youtubePost);

// =========================Edit Youtube page ===================================//
router.get("/update-youtube/:id", renderUpdateYoutube);
router.post("/youtube/update/:id", processUpdateYoutube);

// ========================== Delete Youtube page ================================//
router.delete("/youtube/:id", deleteYoutubeLink);

// =========================== Delete Item ========================================= //
router.delete("/items/:id", deleteItem);

// ========================== Logout User ============================================//
router.get("/logout", logoutUser);





export default router;