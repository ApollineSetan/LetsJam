// models/Section.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Section = sequelize.define('Section', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Section;
