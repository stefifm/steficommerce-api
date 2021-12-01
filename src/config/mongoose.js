import { connect } from "mongoose";
import { MONGODB_URL } from "../config/config";

(async () => {
  const db = await connect(MONGODB_URL);
  console.log("Database connected to", db.connection.name);
})();
