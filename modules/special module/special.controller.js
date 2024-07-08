import runDB from "../../database/DBconnection.js";
import { ObjectId } from "mongodb";

const getSpecific = async (req, res) => {
  const model = req.query.model;
  const modelArr = model.split(",");
  console.log(modelArr[0].charAt(0).toUpperCase());

  let show = await runDB
    .collection("cars")
    .find({
      name: {
        $in: [
          `${modelArr[0].charAt(0).toUpperCase() + modelArr[0].slice(1)}`,
          `${modelArr[1].charAt(0).toUpperCase() + modelArr[1].slice(1)}`,
        ],
      },
    })
    .toArray();
  res.json({ show });
};

const getAvailable = async (req, res) => {
  let model = req.params.model;
  model.charAt(0).toUpperCase() + model.slice(1);

  const models = await runDB
    .collection("cars")
    .find({ name: model, status: "available" })
    .toArray();

  res.json({ models });
};

const getRentedorSpecific = async (req, res) => {
  const { model } = req.query;
  let cars;

  if (model) {
    cars = await runDB.collection("cars").find({ name: model }).toArray();
  } else {
    cars = await runDB.collection("cars").find({ status: "rented" }).toArray();
  }

  res.json({ cars });
};

const getSpecial4 = async (req, res) => {
  const model = req.query.model;
  let cars = await runDB
    .collection("cars")
    .find({
      $or: [
        { model, status: "rented" },
        { model, status: "available" },
      ],
    })
    .toArray();

    res.json({cars})
};
export default { getSpecific, getAvailable, getRentedorSpecific,getSpecial4 };
