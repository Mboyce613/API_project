'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Membership.init({
    groupId: {
      type: DataTypes.INTEGER,
    },
    memberId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['co-host', 'member', 'pending']]
      }

    },
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};