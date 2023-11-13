import config from 'config';

export default {
  // this format accept Sequelize CLI
  [process.env.NODE_ENV || 'development']: { ...config.get('db') },
};
