const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
   
      name: {
        type: DataTypes.STRING,
        allowNull: false,
   
      },
    },{
      timestamps: false,
      freezeTableName: true
    });
  };