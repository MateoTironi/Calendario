const { User, Appointment } = require("../db");

const newApp = async (petName, email, number, service, profesional, date, hour) => {
  const newApp = Appointment.create({
    petName,
    email,
    number,
    service,
    profesional,
    date,
    hour,
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
  const result = await Appointment.findByPk(id, {
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
