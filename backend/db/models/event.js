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
        {foreignKey: 'groupId',
        onDelete: 'CASCADE'}
      ),
      Event.belongsTo(
        models.Venue,
        {foreignKey: 'venueId'}
      ),
      Event.belongsToMany(
        models.User,
        { through: models.Attendee,
          foreignKey: 'eventId',
          otherKey: 'userId'
        }
      ),
      Event.hasMany(
        models.Image,
        { 
          as:'EventImages',
          foreignKey: 'imageableId',
          constraints: false,
          scope: {
            imageableType: 'Event'
          }
      }
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
      isIn: [['Online', 'In person']]
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
            throw new Error("End date is less than start date")
          }
        }
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    defaultScope: { 
      attributes: { 
          exclude: [ "updatedAt","createdAt" ] 
      }
  },
    sequelize,
    modelName: 'Event',
  });
  return Event;
};

