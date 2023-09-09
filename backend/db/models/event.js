'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(
        models.Group,
        {foreignKey: 'groupId'}
      ),
      Event.belongsTo(
        models.Group,
        {foreignKey: 'venueId'}
      )
    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
    },
    venueId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      validate:{
        min: 5,
      }
    },
    type: {
      type: DataTypes.STRING,
      validate:{
        // only accept 'online' or 'inperson'
      isIn: [['online', 'inperson']]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      validate:{
        isDate: true,
        afterToday(value){
          if (new Date(value) < new Date()){
            throw new Error("must be in the future")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate:{
        afterStart(value){
          if (new Date(value) < this.startDate){
            throw new Error("end date must be after start date")
          }
        }
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.NUMERIC,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};