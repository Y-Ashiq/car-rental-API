import runDB from "../../database/DBconnection.js";
import { ObjectId } from "mongodb";

const createRent = async (req, res) => {
  const { car_id, customer_id } = req.body;

  const userExist = await runDB
    .collection("users")
    .findOne({ _id: new ObjectId(`${customer_id}`) });
  const carExist = await runDB
    .collection("cars")
    .findOne({ _id: new ObjectId(`${car_id}`) });

  if (!userExist) {
    return res.json({ meassage: "user not found" });
  }
  if (!carExist) {
    return res.json({ meassage: "car not found" });
  }

  if (carExist.status == "available") {
    await runDB.collection("rented").insertOne({
      customer_id: new ObjectId(`${customer_id}`),
      car_id: new ObjectId(`${car_id}`),
      rental_date: new Date(),
      return_date: new Date(),
    });

    await runDB
      .collection("cars")
      .updateOne(
        { _id: new ObjectId(`${car_id}`) },
        { $set: { status: "rented" } }
      );

    res.json({ message: "car rented successfully" });
  } else {
    res.json({ message: "this car is rented" });
  }
};

const updateRent = async (req, res) => {
  const id = req.params.id;

  const { return_date, rent_date, car_id } = req.body;
  await runDB
    .collection("rented")
    .updateOne(
      { _id: new ObjectId(`${id}`) },
      { $set: { return_date, rent_date, car_id: new ObjectId(`${car_id}`) } }
    );

  res.json({ meassge: "updated successfully" });
};
const deleteRent = async (req, res) => {
  const id = req.params.id;

  await runDB.collection("rented").deleteOne({ _id: new ObjectId(`${id}`) });

  res.json({ meassge: "updated successfully" });
};
const getAllRents = async (req, res) => {
  const rents = await runDB.collection("cars").find().toArray();
  res.json({ rents });
};
export default {
  createRent,
  updateRent,
  deleteRent,
  getAllRents
};
