import express from "express";
import { addItem, editItem } from "../controllers/item.controller.js";
import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

const itemRouter = express.Router();

itemRouter.get("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.get("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;
