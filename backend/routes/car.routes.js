import express from "express";
import { createCar, deleteCar, getCars, updateCar } from "../controller/car.controller.js";


const router = express.Router()

router.get("/", getCars)

router.post("/", createCar)

router.put("/:id" , updateCar)

router.delete("/:id", deleteCar)


export default router