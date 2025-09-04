import express from "express";
import { createEditShop } from "../controllers/shop.controller";
import { upload } from "../middleware/multer";

const shopRouter = express.Router();

shopRouter.get("/create-edit", isAuth, upload.single("image"), createEditShop);

export default shopRouter;
