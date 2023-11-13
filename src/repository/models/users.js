import Sequelize from 'sequelize';

/**
  * @openapi
  * components:
  *  schemas:
  *    CreateUserInput:
  *      type: object
  *      required:
  *        - email
  *        - username
  *        - password
  *      properties:
  *        email:
  *          type: string
  *          default: jane.doe@example.com
  *        username:
  *          type: string
  *          default: JaneDoe
  *        password:
  *          type: string
  *          default: password1234
  *    CreateUserResponse:
  *      type: object
  *      properties:
  *        id:
  *          type: number
  *        email:
  *          type: string
  *        username:
  *          type: string
  *        UUID:
  *          type: string
  *        createdAt:
  *          type: string
  *        updatedAt:
  *          type: string
  */
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
