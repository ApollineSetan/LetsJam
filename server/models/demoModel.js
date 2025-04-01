// models/Demo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Section from './Section.js';

const Demo = sequelize.define('Demo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.TIME,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Section,
      key: 'id'
    }
  }
});

Demo.belongsTo(Section, { foreignKey: 'section_id' });
Section.hasMany(Demo, { foreignKey: 'section_id' });

export default Demo;
