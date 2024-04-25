const { Router } = require("express");

const { User, Appointment } = require("../db");
const { appoByDate, allAppo, appoById, newApp } = require("../utils/utilsApp");

const router = Router();

router.get("/appointment", async (req, res) => {
  let { date } = req.body;

  if (date) {
    try {
      const result = await appoByDate(date);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  try {
    const result = await allAppo();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.get("/appointment/:appoId", async (req, res) => {
  let { appoId } = req.params;

  if (!appoId) throw new Error("Params must be true");

  try {
    const result = await appoById(appoId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.post("/appointment", async (req, res) => {
  const { petName, email, number, service, profesional, date, hour } = req.body;
  console.log({ petName, email, number, service, profesional, date, hour });
  try {
    const newAppo = await newApp(petName, email, number, service, profesional, date, hour);
    res.status(200).json(newAppo);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
