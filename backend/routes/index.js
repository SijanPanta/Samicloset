import { Router } from "express";
import productRoutes from "../modules/product/product.route.js";
import subscriberRoutes from "../modules/subscriber/subscriber.route.js";
import userRoutes from "../modules/user/user.route.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/users", userRoutes);

export default router;
