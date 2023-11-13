import { v4 } from 'uuid';
import DatabaseRepositiry from '../../repository/index.js';

export default class UserController {
  constructor() {
    this.databaseRepositiry = DatabaseRepositiry.getInstance();
  }

  async create({ email, username, password }) {
    try {
      const user = await this.databaseRepositiry.db.models.users.create({
        email,
        username,
        password,
        UUID: v4(),
        isDeleted: false,
      });

      console.log('User successfully created', { UUID: user.UUID });

      return user;
    } catch (error) {
      console.error('Creating user error: ', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.databaseRepositiry.db.models.users.findOne({ where: { email }, raw: true });
      console.log('user', user);

      if (!user) {
        throw new Error('User with provided email not found!');
      }

      return user;
    } catch (error) {
      console.error('Getting user error: ', { email }, error);
      throw error;
    }
  }
}

