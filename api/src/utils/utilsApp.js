const { User, Appointment } = require("../db");

const newApp = async (date, description) => {
  const newApp = Appointment.create({
    date,
    description,
  });

  return newApp;
};

const allAppo = async () => {
  const result = Appointment.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });

  return result;
};

const appoByDate = async (date) => {
  const result = Appointment.findOne({
    where: { date },
    include: {
      model: User,
      attributes: ["name"],
    },
  });

  if (!result) throw new Error("Appointment not found");

  return result;
};

const appoById = async (id) => {
  const result = Appointment.findByPk(id, {
    include: {
      model: User,
      attributes: ["name"],
    },
  });

  if (!result) throw new Error("Appointment not found");

  return result;
};

const deleteAppo = async () => {};

module.exports = {
  newApp,
  allAppo,
  appoByDate,
  appoById,
};
