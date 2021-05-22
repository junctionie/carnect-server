const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reservations', {
      reservationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      limitPersonCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
      },
      facility: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      start: {
        type: DataTypes.STRING,
      },
      destination: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reservations');
  },
};
