module.exports = (sequelize, DataTypes) => {
  const Participations = sequelize.define(
    'Participations',
    {
      participationId: {
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
      reservationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Reservations',
          key: 'reservationId',
        },
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

  Participations.associate = (models) => {
    Participations.belongsTo(models.Reservations, {
      as: 'r',
    });
  };

  return Participations;
};
