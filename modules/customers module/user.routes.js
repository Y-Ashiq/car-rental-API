import { Router } from "express";

import userControllers from "./user.controllers.js";

const userRourter = Router();

userRourter.post("/signup", userControllers.signup);

userRourter.post("/signin", userControllers.signIn);

userRourter.get("/getallusers", userControllers.getAllUsers);

userRourter
  .route("/:id")
  .get(userControllers.getSpecificUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default userRourter;
