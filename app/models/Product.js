const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const sequelize = db.sequelize;

const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 30],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  purchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Product;
