module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define(
    'Tokens',
    {
      tokenId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamp: false,
    }
  );

  return Tokens;
};
