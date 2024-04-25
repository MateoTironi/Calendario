const { Router } = require("express");

const { Dates } = require("../db");
const { dates, newDates, upDate, dayOff } = require("../utils/utilsDates");
const router = Router();

router.get("/dates", async (req, res) => {
  try {
    const result = await dates();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.get("/dayOff", async (req, res) => {
  try {
    const result = await dayOff();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.post("/dates", async (req, res) => {
  const { date, hour, reserved } = req.body;

  try {
    const newD = await newDates(date, hour, reserved);
    return res.status(200).json(newD);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.put("/date/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const result = await upDate(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = router;
