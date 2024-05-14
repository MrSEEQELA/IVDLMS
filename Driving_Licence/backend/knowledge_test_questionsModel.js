const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'drivers',
  username: 'postgres',
  password: '38745',
  host: 'localhost',
  port: 5432,
});

// Define the model for knowledge_test_questions table
const KnowledgeTestQuestion = sequelize.define('knowledge_test_question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  correct_answer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Synchronize the model with the database
(async () => {
  await sequelize.sync({ alter: true });
  console.log("Model synchronized with database");
})();

module.exports = KnowledgeTestQuestion;

