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

      if (!user) {
        throw new Error('User with provided email not found!');
      }

      return user;
    } catch (error) {
      console.error('Getting user error: ', { email }, error);
      throw error;
    }
  }

  async setUsername(email, username) {
    try {
      // TODO: improve update method
      const [, updatedUser] = await this.databaseRepositiry.db.models.users.update({ username }, {
        where: { email },
        returning: true,
      });

      return updatedUser[0];
    } catch (error) {
      console.error('Setting username error', { email }, error);
      throw error;
    }
  }
}
