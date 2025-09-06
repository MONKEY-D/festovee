import express from "express";
import {
  addItem,
  editItem,
  getItemById,
} from "../controllers/item.controller.js";
import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-by-id/:itemId", isAuth, getItemById);

export default itemRouter;
