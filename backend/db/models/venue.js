'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.belongsTo(
        models.Group,
        {foreignKey: 'groupId',
        onDelete: 'CASCADE'}
      ),
      Venue.hasMany(
        models.Event,
        { foreignKey: 'venueId',}
      )
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validator:{
        isAlphanumeric: true,
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.NUMERIC,
    },
    lng: {
      type: DataTypes.NUMERIC,
    }
  }, 
  {
    defaultScope: { 
      attributes: { 
          exclude: [ "createdAt", "updatedAt" ] 
      }
  },
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};