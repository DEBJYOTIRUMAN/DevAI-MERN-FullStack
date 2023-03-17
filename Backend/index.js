import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './connect.js';
import routes from "./routes/index.js";
import errorHandler from './middlewares/errorHandler.js';

const APP_PORT = process.env.PORT || 8080;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use("/api", routes);
app.use(errorHandler);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome DevAI Server',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}.`));
  } catch (error) {
    console.log(error);
  }
};

startServer();