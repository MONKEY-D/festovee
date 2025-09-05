import express from "express";
import { createEditShop, getMyShop } from "../controllers/shop.controller.js";
import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

const shopRouter = express.Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-my", isAuth, isAuth, getMyShop);

export default shopRouter;
