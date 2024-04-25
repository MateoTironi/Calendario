const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("dates", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
