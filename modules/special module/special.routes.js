import { Router } from "express";

import specialController from "./special.controller.js";

const specialRourter = Router();

specialRourter.get("/special", specialController.getSpecific);
specialRourter.get("/special/available/:model", specialController.getAvailable);
specialRourter.get("/special/specific/", specialController.getRentedorSpecific);
specialRourter.get("/special/specific4/", specialController.getSpecial4);

export default specialRourter;
