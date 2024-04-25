const { Dates } = require("../db");

const dates = async () => {
  const dates = Dates.findAll({
    where: { reserved: false },
  });
  return dates;
};

const dayOff = async () => {
  const dates = Dates.findAll({
    where: { reserved: true },
  });
  return dates;
};

const newDates = async (date, hour, reserved) => {
  const newD = await Dates.create({
    date,
    hour,
    reserved,
  });

  return newD;
};

const upDate = async (id) => {
  let result = await Dates.update(
    { reserved: true },
    {
      where: {
        id,
      },
    }
  );

  return result;
};

module.exports = {
  dates,
  newDates,
  upDate,
  dayOff,
};
