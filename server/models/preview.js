'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Preview.belongsTo(models.Product, { foreignKey: "term_id" })
    }
  };
  Preview.init({
    term_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Preview',
  });
  return Preview;
};