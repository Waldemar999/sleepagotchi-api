import { v4 } from 'uuid';
import DatabaseRepositiry from '../../repository/index.js';

export default class UserService {
  constructor() {
    this.databaseRepositiry = DatabaseRepositiry.getInstance();
  }

  async create({ email, username, password }) {
    try {
      const user = await this.getUserByEmail(email);

      if (user !== null) {
        console.warn('User with particular email already created!', { email });
        return null;
      }

      const createdUser = await this.databaseRepositiry.db.models.users.create({
        email,
        username,
        password,
        UUID: v4(),
      });

      const { password: omittedPassword, ...userWithoutPassword } = createdUser.get();

      console.log('User successfully created', userWithoutPassword);

      return userWithoutPassword;
    } catch (error) {
      console.error('Creating user error: ', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.databaseRepositiry.db.models.users.findOne(
        { where: { email }, raw: true },
      );

      if (!user) {
        console.warn('User with provided email not found!', { email });
        return null;
      }

      return user;
    } catch (error) {
      console.error('Getting user error: ', { email }, error);
      throw error;
    }
  }

  async setUsername(email, username) {
    try {
      const [, updatedUser] = await this.databaseRepositiry.db.models.users.update({ username }, {
        where: { email },
        returning: true,
      });

      console.log('Username successfully updated', { email, username });

      return updatedUser[0];
    } catch (error) {
      console.error('Setting username error', { email }, error);
      throw error;
    }
  }
}
