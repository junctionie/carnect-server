module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: {
        type: DataTypes.STRING,
      },
      provider: {
        type: DataTypes.STRING,
      },
      kakaoId: {
        type: DataTypes.INTEGER
      },
      kakaoToken: {
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
    },
    {
      timestamp: true,
    }
  );

  return Users;
};
