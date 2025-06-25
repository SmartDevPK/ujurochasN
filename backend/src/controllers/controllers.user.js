import { ApiError } from "../util/ApiError.js";
import contents from "../models/contents.js";
import Item from "../models/items.js";
import YoutubeLink from "../models/youtube.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "./nodemailer.js";
import mongoose from "mongoose";

// ========================== YouTube Controller ========================== //
;


// Render the YouTube submission page
export const renderYoutubePage = async (req, res) => {
  try {
    // Fetch YouTube item data from the database
    const youtubeItems = await YoutubeLink.find().lean(); // Assuming YoutubeLink is your model


    // Render the EJS template with the fetched data
    return res.status(200).render("auth/youtube", {
      youtubeItems, // Pass the fetched data to the EJS template
      error: null, // No error initially
    });
  } catch (error) {
    console.error("Error fetching YouTube items:", error);

    // Render the EJS template with an error message
    return res.status(500).render("auth/youtube", {
      youtubeItems: [], // Pass an empty array if there's an error
      error: "Server error: Unable to fetch YouTube items.",
    });
  }
};
// Handle YouTube link submission
export const youtubePost = async (req, res) => {
  try {
      const { youtubeLink } = req.body;

      // Validate YouTube link
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/;
      if (!youtubeLink || !youtubeRegex.test(youtubeLink)) {
          return res.status(400).render("auth/youtube", { error: "Invalid YouTube link" });
      }

      // Save YouTube link to database
      const newYoutubeItem = new YoutubeLink({ youtubeLink });
      await newYoutubeItem.save();

      // Redirect to admin view after successful submission
      res.status(201).redirect("/view-admin");
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Render update YouTube page
export const renderUpdateYoutube = async (req, res) => {
  try {
      const { id } = req.params;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).render("auth/update-youtube", { error: "Invalid YouTube link ID", youtubeItem: null });
      }

      // Find the YouTube item by ID
      const youtubeItem = await YoutubeLink.findById(id);
      if (!youtubeItem) {
          return res.status(404).render("auth/update-youtube", { error: "YouTube link not found", youtubeItem: null });
      }

      // Render the update form with the existing YouTube link
      res.render("auth/update-youtube", { youtubeItem, error: null });
  } catch (error) {
      res.status(500).render("auth/update-youtube", { error: "Server error", youtubeItem: null });
  }
};

// Process update YouTube link
export const processUpdateYoutube = async (req, res) => {
  try {

    console.log("Received request body:", req.body)

      const { id } = req.params;
      const { youtubeLink } = req.body;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).render("auth/update-youtube", { error: "Invalid YouTube link ID", youtubeItem: null });
      }

        // Find the YouTube item by ID
        const youtubeItem = await YoutubeLink.findById(id);
        if (!youtubeItem) {
            return res.status(404).render("auth/update-youtube", { error: "YouTube link not found", youtubeItem: null });
        }
  

      // Validate YouTube link format
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/;
      if (!youtubeRegex.test(youtubeLink)) {
          return res.status(400).render("auth/update-youtube", { error: "Invalid YouTube link format", youtubeItem: null });
      }

      // Update YouTube link in the database
      const updatedYoutubeItem = await YoutubeLink.findByIdAndUpdate(
          id,
          { youtubeLink },
          { new: true, runValidators: true }
      );

      if (!updatedYoutubeItem) {
          return res.status(404).render("auth/update-youtube", { error: "YouTube link not found", youtubeItem: null });
      }

      // Redirect to admin panel after successful update
      res.redirect("/view-admin");
  } catch (error) {
      res.status(500).render("auth/update-youtube", { error: "Server error", youtubeItem: null });
  }
};
// ======================== Delete Item =============================//
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params; // Get item ID from URL

    // Find and delete the item
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).redirect("/view-admin");;
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
};

//========================== Delete Youtube Link ======================//
export const deleteYoutubeLink = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid YouTube link ID" });
    }

    // Find and delete the YouTube link
    const deletedItem = await YoutubeLink.findByIdAndDelete(id);

    // If the item is not found, return a 404 error
    if (!deletedItem) {
      return res.status(404).json({ message: "YouTube link not found" });
    }

    // Send a success response
    res.status(200).redirect("/view-admin");
  } catch (error) {
    // Handle errors
    console.error("Error deleting YouTube link:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================== Admin Controller ========================== //

// Render Home Page and Redirect to Register
const renderHomePage = async (req, res) => {
  try {
    return res.status(200).render("auth/register", { errors: null });
  } catch (error) {
    console.error("Error rendering registration page:", error);
    throw new ApiError(500, "Something went wrong while rendering the page");
  }
};

// Render Login Page
const loginPage = async (req, res) => {
  try {
    const email = req.query.email || "";
    const items = await contents.find(); 
    return res.status(200).render("auth/login", { email, errors: null, items });
  } catch (error) {
    console.error("Error rendering login page:", error);
    throw new ApiError(500, "Something went wrong while rendering the login page");
  }
};

const adminDashboard = async (req, res) => {
    try {
        const items = await contents.find(); // Fetch all items from the database

        res.render("auth/view-admin", { items: items, youtubeItems: youtubeItems });// Ensure items is passed to EJS
    } catch (error) {
        console.error("Admin Dashboard Error:", error);
        return res.status(500).render("auth/view-admin", { items: [] }); // Avoid undefined error
    }
};


// Render Admin Page
const imagePage = async (req, res) => {
  try {
    return res.status(200).render("auth/admin");
  } catch (error) {
    console.error("Error rendering admin page:", error);
    throw new ApiError(500, "Something went wrong while rendering the admin page");
  }
};

// Handle image post request
export const imagePost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input fields
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if files (images) are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Ensure no more than 4 images are uploaded
    if (req.files.length > 4) {
      return res.status(400).json({ error: "You can upload a maximum of 4 images." });
    }

    // Get image paths
    const imagePaths = req.files.map((file) => file.path);
    console.log("Image paths:", imagePaths); // Debugging

    // Create a new item with the new data
    const newItem = new Item({ title, description, image: imagePaths });

    // Validate the item before saving
    await newItem.validate(); // Manually trigger validation

    await newItem.save();

    // Redirect to the admin view
    return res.status(201).redirect("/view-admin");
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Render Admin View Page
const viewAdminPage = async (req, res) => {
    try {
      const items = await Item.find().lean(); // Ensure 'Item' is the correct model
      const youtubeItems = await YoutubeLink.find(); 
  
  
      if (!items || items.length === 0) {
        console.log("No items found");
      }
  
    
      return res.status(200).render("auth/view-admin", { items,youtubeItems });// Ensure items is passed
    } catch (error) {
      console.error("Error fetching admin data:", error);
      res.status(500).render("auth/view-admin", {youtubeItems, items: [] }); // Avoid crashing
    }
  };
  

// Render Update Admin Page
const editItemPage = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).render("auth/update-admin", { item });
  } catch (error) {
    console.error("Error rendering edit page:", error);
    res.status(500).json({ error: "Something went wrong while rendering the edit page" });
  }
};

// Render Update Admin Page
// Update Item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        // Validate input fields
        if (!title || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find the existing item
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Update item fields
        item.title = title;
        item.description = description;

        // If new images are uploaded, replace the existing images
        if (images.length > 0) {
            item.image = images;
        }

        // Save updated item
        await item.save();

        console.log("Updated Item:", item);
        res.redirect("/view-admin");
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Something went wrong while updating the item" });
    }
};


// Handle User Signup
const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const errors = [];

        // Validate Input Fields
        if (!name || !email || !password) {
            errors.push("All fields are required.");
        }

        // Check if Email Already Exists
        const existingUser = await contents.findOne({ email });
        if (existingUser) {
            errors.push("Email is already registered.");
        }

        // Define Password Schema
        const passwordSchema = Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required();

        // Validate Password
        const { error } = passwordSchema.validate(password);
        if (error) {
            errors.push("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        }

        // If Validation Errors Exist, Return Errors
        if (errors.length > 0) {
            return res.status(400).render("auth/register", { errors });
        }

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = new contents({ name, email, password: hashedPassword });
        await newUser.save();

        // Redirect to Login Page After Successful Signup
        return res.status(201).render("auth/login");
    } catch (error) {
        console.error("Error saving user:", error);
        throw new ApiError(500, "Something went wrong while saving the user.");
    }
};

// Handle User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let errors = {};

        // Check if User Exists
        const user = await contents.findOne({ email });
        if (!user) {
            errors.general = "Invalid email or password";
            return res.status(400).render("auth/login", { errors, email });
        }

        // Compare Passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.general = "Invalid email or password";
            return res.status(400).render("auth/login", { errors, email });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store Token in Cookies
        res.cookie("token", token, { httpOnly: true });

        // Redirect to Admin Page
        
        return res.redirect("/view-admin"); 
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).render("auth/login", { errors: { general: "Something went wrong" }, email });
    }
};

const forgotPasswordPage = async (req, res) => {
    const { token } = req.params;
    try {
        return res.status(200).render("auth/forgetPassword", { token });
    } catch (error) {
        console.error("Error rendering forgot password page:", error);
        throw new ApiError(500, "Something went wrong while rendering the page");
    }
};


// Handles Forgot Password Request
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await contents.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User not found");
        }

        // Generate Password Reset Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const resetUrl = `http://localhost:4000/reset-password/${encodeURIComponent(token)}`;


        // Email Options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetUrl}`,
        };

        // Send Reset Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link sent to email" });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Error sending email" });
    }
};

const resetPasswordPage = async (req, res) => {
    try {
      return res.status(200).render("auth/resetPassword", { errors: null });
    } catch (error) {
      console.error("Error rendering forgot password page:", error);
      throw new ApiError(500, "Something went wrong while rendering the page");
    }
  }

  const resetPassword = async (req, res) => {
    const { token } = req.params; 
    const { newPassword } = req.body; 
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await contents.findById(decoded.userId);
  
      if (!user) {
        throw new ApiError(400, "User not found");
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      user.resetPasswordToken = undefined; 
      user.resetPasswordExpires = undefined; 
      await user.save();
  
      // Redirect to the login page
      res.status(200).render("auth/login", { message: "Password reset successful" });
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).render("auth/resetPassword", { error: "Token expired", token });
      }
      res.status(400).render("auth/resetPassword", { error: "Invalid or expired token", token });
    }
  };;

  const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};

export { 
    renderHomePage, 
    loginPage,
    handleSignup, 
    loginUser, 
    forgotPassword, 
    forgotPasswordPage,
    resetPassword,
    resetPasswordPage,
    imagePage,
    viewAdminPage,
    updateItem,
    editItemPage,
    logoutUser,
    adminDashboard
};
