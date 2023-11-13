import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from 'config';

export default class DatabaseRepositiry {
  static _instance;

  constructor() {
    this.config = dbConfig.get('db');
    this.db = {};
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new DatabaseRepositiry();
    return this._instance;
  }

  async connect() {
    if (!this.config.url) {
      console.error('Unable to connect to the database because connection url is missing!');
    }

    try {
      const sequelize = new Sequelize(this.config.url, dbConfig);

      await this.initializeModels(sequelize);

      this.db.sequelize = sequelize;

      console.log('Database connection has been established successfully!');
    } catch (error) {
      console.error('Unable to connect to the database: ', error.message);
    }
  }

  async initializeModels(sequelizeInstance) {
    const models = {};
    try {
      const directory = path.resolve('src', 'repository', 'models');

      const modelsFiles = fs
        .readdirSync(directory)
        .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'));

      for (const model of modelsFiles) {
        const { default: importedModel } = await import(path.join(directory, model));
        models[model.split('.js')[0]] = importedModel(sequelizeInstance);
      }

      Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
          models[modelName].associate(models);
        }
      });
    } catch (error) {
      console.error('Initialization database models error: ', error.message);
    }

    this.db.models = models;
  }
}
