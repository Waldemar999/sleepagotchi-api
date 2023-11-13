import util from 'util';
import jwt from 'jsonwebtoken';
import DatabaseRepository from '../../repository/index.js';
import UserController from '../userController/index.js';

const jwtSign = util.promisify(jwt.sign);

export default class AuthController {
  constructor() {
    this.databaseRepositiry = DatabaseRepository.getInstance();
    this.userController = new UserController();
  }

  async login(email, password) {
    try {
      const user = await this.userController.getUserByEmail(email);

      const token = await this.generateAccessToken(user);

      return token;
    } catch (error) {
      console.error('Unable to authenticate user', { email });
      throw error;
    }
  }

  generateAccessToken(user) {
    // TODO: implement refresh token
    return jwtSign(user, process.env.SECRET_KEY); // { expiresIn: '1d' }
  }
}
