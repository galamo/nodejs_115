import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import apiToken from "./middleware/api.token";
import requestDuration from "./middleware/requestDuration";
import limiter from "./middleware/rateLimiter";
import authRouter from "./controllers/auth";
import expensesRouter from "./controllers/expenses";
import userRouter from "./controllers/user";
import govILRouter from "./controllers/govIlData";
import uploaderRouter from "./controllers/uploader";
import path from "path";
import { ERRORS } from "./enum/httpStatus";
import authorizationMiddleware, {
  ReqLocal,
} from "./middleware/authorizationMiddleware";
import logger from "./logger";
import addRequestId from "./middleware/addRequestId";
import cors from "cors";
import getConnection from "./db";

// setTimeout(async () => {
//     const result = await (await getConnection()).query("select * from customers")
//     console.log(result)
// }, 5000);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(addRequestId);
app.use(requestDuration);
app.use(apiToken);
app.use(limiter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/hc", (req, res, next) => {
  res.send("Api is Running");
});

app.use("/auth", authRouter);
app.use("/gov-il-data", govILRouter);
app.use("/uploader", uploaderRouter);
app.use(authorizationMiddleware); // all the routers below protected!!!
app.use("/api/expenses", expensesRouter);
app.use("/api/user", userRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${error.message} reqeustId: ${(req as ReqLocal).requestId}`);

  switch (error.message) {
    case ERRORS.BAD_REQUEST: {
      return res.status(400).send("Bad Request");
    }
    case ERRORS.UNAUTH: {
      return res.status(401).send("Unauthorized___");
    }
    default: {
      return res
        .status(500)
        .send(
          "Something went wrong Yam is working to fix it & flight to America"
        );
    }
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`\x1b[31m${err.message}\x1b[0m`);
    logger.error(`Api is running on port ${PORT}!!!`);
  } else {
    logger.info(`Api is running on port ${PORT}!!!`);
    console.log(`Api is running on port ${PORT}`);
  }
});
