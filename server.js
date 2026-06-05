const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const upload = multer({
  dest: "uploads/"
});

let cases = [];

app.post("/api/chat", (req, res) => {
  const { question } = req.body;

  let answer =
    "Please consult a qualified lawyer. This is a demo legal assistant.";

  if (
    question.toLowerCase().includes("rent")
  ) {
    answer =
      "For rent disputes, collect agreements and payment records before taking legal action.";
  }

  if (
    question.toLowerCase().includes("salary")
  ) {
    answer =
      "Employees may approach labour authorities if salaries are delayed.";
  }

  res.json({ answer });
});

app.get("/api/cases", (req, res) => {
  res.json(cases);
});

app.post("/api/cases", (req, res) => {
  cases.push(req.body);
  res.json({ success: true });
});

app.post(
  "/upload",
  upload.single("document"),
  (req, res) => {
    res.send("Uploaded Successfully");
  }
);

app.listen(3000, () => {
  console.log(
    "Server running at http://localhost:3000"
  );
});
