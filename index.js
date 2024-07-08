import express from 'express'
import runDB from './database/DBconnection.js';
import userRourter from './modules/customers module/user.routes.js';
import carRourter from './modules/cars module/cars.routes.js';
import rentalRourter from './modules/rentals module/rental.routes.js';
import specialRourter from './modules/special module/special.routes.js';
const app = express();
const port = 3000;

app.use(express.json())


runDB;
// const creatJoin = async () => {
//    const rental = await runDB
//       .collection("rented")
//       .aggregate([
//         {
//           $lookup: {
//             from: "users",
//             localField: "customer_id",
//             foreignField: "_id",
//             as: "customer_info",
//           },
//         },
//         { $unwind: '$customer_info' },
//         {
//           $lookup: {
//             from: "cars",
//             localField: "car_id",
//             foreignField: "_id",
//             as: "car_info",
//           },
//         },{ $unwind: '$car_info' }
//       ])
//       .toArray();

//       console.log(rental);
//   };
  
// creatJoin();
app.use('/user',userRourter)
app.use('/car',carRourter)
app.use(rentalRourter)
app.use(specialRourter)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))