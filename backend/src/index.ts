import * as dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Server } from "../src/server";
// import * as mongoose from "mongoose";

let server = new Server().app;
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// mongoose
//   .connect(
//     "mongodb+srv://lupreshie_db_user:BM7XHgvaNP7g9jg8@airbnb-data.qwco3pa.mongodb.net/airbnb_clone?appName=airbnb-data",
//   )
//   .then(() => console.log("Connected to mongodb"))
//   .catch((err) => {
//     console.error("MONGODB CONNECTION ERROR:", err);
//     process.exit(1);
//   });
