import { Router } from "express";

import rentalControllers from "./rental.controllers.js";

const rentalRourter = Router();

rentalRourter.post("/createrent", rentalControllers.createRent);
rentalRourter.patch('/updaterent/"id', rentalControllers.updateRent);
rentalRourter.delete('/deleterent/"id', rentalControllers.deleteRent);
rentalRourter.get("/getallrents", rentalControllers.getAllRents);

export default rentalRourter;
