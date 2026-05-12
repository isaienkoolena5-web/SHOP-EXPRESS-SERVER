import express from "express";
import productsRouter from "../src/products/routes/products.routes"
import usersRouter from "./users/routes/users.routes"

const app = express();

app.use(express.json());

app.get("/helth", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/products", productsRouter);
app.use("/users", usersRouter);

export default app;