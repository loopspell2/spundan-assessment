const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connection = require("./config/db");
const Auth = require("./controllers/auth");
const menuRouter = require("./controllers/menu");
const auth = require("./middleware/auth");
const orderRouter = require("./controllers/order");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser());

app.use('/auth', Auth);
app.use('/order',auth, orderRouter);
app.use('/menu',auth, menuRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });


(async () => {
  try {
    await connection();
    console.log("Database connected successfully");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();
