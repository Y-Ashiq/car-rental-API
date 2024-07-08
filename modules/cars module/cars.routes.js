import { Router } from "express";

import carControllers from "./cars.controller.js";

const carRourter = Router();

carRourter.post("/addcar", carControllers.addCar);

carRourter.get("/getallcars", carControllers.getAllCars);

carRourter
  .route("/:id")
  .get(carControllers.getSpecifiCar)
  .patch(carControllers.updateCar)
  .delete(carControllers.deleteCar);

export default carRourter;
