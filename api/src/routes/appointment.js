const { Router } = require("express");

const { User, Appointment } = require("../db");
const { appoByDate, allAppo, appoById, newApp } = require("../utils/utilsApp");

const router = Router();

router.get("/appointment", async (req, res) => {
  let { date } = req.body;

  if (date) {
    try {
      const res = await appoByDate(date);
      return res.status(200).json(res);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  try {
    const res = await allAppo();
    return res.status(200).json(res);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.get("/appointment/:appoId", async (req, res) => {
  let { appoId } = req.params;

  if (!appoId) throw new Error("Params must be true");

  try {
    const res = await appoById(appoId);
    res.status(200).json(res);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/appointment", async (req, res) => {
  const { date, description } = req.body;

  try {
    const newAppo = await newApp(date, description);
    res.status(200).json(newAppo);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
