import express from "express";
import { addItem, editItem } from "../controllers/item.controller";
import { upload } from "../middleware/multer";

const itemRouter = express.Router();

itemRouter.get("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.get("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;
