import * as dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Server } from "./server";

let server = new Server().app;
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// Jwt.gen_secret_key();

