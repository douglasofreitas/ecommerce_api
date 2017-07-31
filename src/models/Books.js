import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Books = sequelize.define('books', 
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      value: {
        type: DataType.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
    },
    {
      hooks: {
      },
      classMethods: {
      },
    });
  return Books;
};
