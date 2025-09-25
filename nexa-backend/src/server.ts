// src/server.ts (excerpt)
import "dotenv/config";
import express from "express";
import cors from "cors";
import yieldsRouter from "./api/yields";
import intentRouter from "./api/intent";
import submitRouter from "./api/submit";
import statusRouter from "./api/status";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/", yieldsRouter);
app.use("/", intentRouter);
app.use("/", submitRouter);
app.use("/", statusRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`nexa-backend listening on http://localhost:${process.env.PORT || 4000}`);
});
