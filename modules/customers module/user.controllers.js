import runDB from "../../database/DBconnection.js";
import { ObjectId } from "mongodb";

const signup = async (req, res) => {
  await runDB.collection("users").insertOne(req.body);

  res.json({ message: "user added successfully" });
};

const signIn = async (req, res) => {
  let { email, password } = req.body;

  let isFound = await runDB
    .collection("users")
    .find({ email, password })
    .project({ password: 0, email: 0 })
    .toArray();

  if (isFound.length > 0) {
    res.json({ isFound });
  } else {
    res.json({ message: "wrong email or password" });
  }
};

const getSpecificUser = async (req, res) => {
  const id = req.params.id;

  let user = await runDB
    .collection("users")
    .find({ _id: new ObjectId(`${id}`) })
    .toArray();
  res.json({ user });
};
const getAllUsers = async (req, res) => {
  let allUsers = await runDB.collection("users").find().toArray();

  res.json({ allUsers });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, phonenumber } = req.body;

  let user = await runDB
    .collection("uesrs")
    .updateOne(
      { _id: new ObjectId(`${id}`) },
      { $set: { username, phonenumber } }
    );
  console.log(user);
  res.json({ message: "user updated successfully" });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  let user = await runDB
    .collection("uesrs")
    .deleteOne({ _id: new ObjectId(`${id}`) });
  console.log(user);
  res.json({ message: "user deleted successfully" });
};

export default {
  signIn,
  signup,
  getSpecificUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
