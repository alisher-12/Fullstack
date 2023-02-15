import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import productsController from "./6-controllers/products-controller";

const server = express();

server.use(cors());
//server.use(cors({origin: "http://mysite.com", "http:/some-other-site.com"}));//Enable only that website frontend for accessing our backend

server.use(express.json());
server.use("/", productsController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
