'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Price.belongsTo(models.Product, { foreignKey: "term_id" })
    }
  };
  Price.init({
    term_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};