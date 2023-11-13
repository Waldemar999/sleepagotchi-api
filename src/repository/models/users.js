import Sequelize from 'sequelize';

export default (sequelize) => {
  class User extends Sequelize.Model { }

  User.init({
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    UUID: Sequelize.UUID,
  }, {
    sequelize,
    modelName: 'users',
  });

  return User;
};
