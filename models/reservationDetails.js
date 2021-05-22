module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ReservationDetails',
    {
      reservationDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Reservations',
          key: 'reservationId',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      cost: {
        type: DataTypes.INTEGER,
      },
      dueDate: {
        type: DataTypes.DATE,
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
    },
    {
      timestamp: true,
    }
  );
};
