const { Router } = require("express");

const { User, Appointment } = require("../db");
const { users, userByName, userById, newUser } = require("../utils/utilsUser");
const router = Router();

router.get("/user", async (req, res) => {
  let { gmail } = req.body;

  if (gmail) {
    try {
      const result = await userByName(gmail);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  try {
    const result = await users();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.get("/user/:userId", async (req, res) => {
  let { userId } = req.params;

  if (!userId) throw new Error("Params must be true");

  try {
    const result = await userById(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/user", async (req, res) => {
  const { name, password, gmail, number } = req.body;

  try {
    const repeated = await User.findOne({ where: { name: name } });
    if (repeated) return alert("El usuario ya existe");

    const newU = await newUser(name, password, gmail, number);

    res.status(200).json(newU);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
