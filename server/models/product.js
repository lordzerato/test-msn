'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasOne(models.Pivot, { foreignKey: "term_id" }),
      Product.hasOne(models.Price, { foreignKey: "term_id" }),
      Product.hasOne(models.Preview, { foreignKey: "term_id" }),
      Product.hasOne(models.Stock, { foreignKey: "term_id" })
      Product.belongsToMany(models.Category, {
        through: "Pivots",
        foreignKey: "term_id"
      })
    }
  };
  Product.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    lang: DataTypes.STRING,
    auth_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};