'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Group, {
        as: 'previewImage',
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(
        models.Event, {
        as:'EventImages',
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      validate:{
        // isUrl: true,
      }
    },
    preview: {
      type: DataTypes.BOOLEAN
    },
  }, {
  //   defaultScope: { 
  //     attributes: { 
  //         exclude: [ "createdAt", "updatedAt" ] 
  //     }
  // },
    sequelize,
    modelName: 'Image',
  });
  return Image;
};