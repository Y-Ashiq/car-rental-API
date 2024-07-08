import { ObjectId } from "mongodb";
import runDB from "../../database/DBconnection.js";

const addCar = async (req, res) => {
  await runDB.collection("cars").insertOne(req.body);
  res.json({ message: "car added" });
};

const getSpecifiCar = async (req, res) => {
  const id = req.params.id;

  const car = await runDB
    .collection("cars")
    .find({ _id: new ObjectId(`${id}`) })
    .toArray();

  if (car.length > 0) {
    res.json({ car });
  } else {
    res.json({ message: "car not found" });
  }
};

const getAllCars = async (req, res) => {
  const allCars = await runDB.collection("cars").find().toArray();
  req.json({ allCars });
};

const updateCar = async (req, res) => {
  const id = req.params.id;
  const { status, name, model } = req.body;

  let car = await runDB
    .collection("cars")
    .updateOne(
      { _id: new ObjectId(`${id}`) },
      { $set: { status, name, model } }
    );
  console.log(car);
  res.json({ message: "car updated successfully" });
};

const deleteCar = async (req, res) => {
  const id = req.params.id;

  let car = await runDB
    .collection("cars")
    .deleteOne({ _id: new ObjectId(`${id}`) });
  console.log(car);
  res.json({ message: "car deleted successfully" });
};

export default { addCar, getSpecifiCar, getAllCars, updateCar, deleteCar };
