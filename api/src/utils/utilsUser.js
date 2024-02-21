const { User, Appointment } = require("../db");

const users = async () => {
  const result = User.findAll({
    include: {
      model: Appointment,
      attributes: ["date", "id"],
    },
  });

  if (!result) throw new Error("User not found");

  return result;
};

const userByName = async (name) => {
  const result = User.findOne({
    where: { name },
    include: {
      model: Appointment,
      attributes: ["date", "description"],
    },
  });

  if (!result) throw new Error("User not found");

  return result;
};

const userById = async (id) => {
  const result = User.findByPk(id, {
    include: {
      model: Appointment,
      attributes: ["date", "description"],
    },
  });

  if (!result) throw new Error("User not found");

  return result;
};

const newUser = async (name, password, gmail, number) => {
  const newUser = User.create({
    name,
    password,
    gmail,
    number,
  });

  return newUser;
};

module.exports = {
  users,
  userById,
  userByName,
  newUser,
};
