const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('babyfootdatabase', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

// Define Party model
const Party = sequelize.define('Party', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// Define Profile model
const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Message model
const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  // Define associations
  Profile.hasMany(Message, { foreignKey: 'senderId' });
  Profile.hasMany(Message, { foreignKey: 'receiverId' });
  Message.belongsTo(Profile, { as: 'Sender', foreignKey: 'senderId' });
  Message.belongsTo(Profile, { as: 'Receiver', foreignKey: 'receiverId' });
  Party.hasMany(Message);
  Message.belongsTo(Party);
  
  sequelize.sync()
    .then(() => {
      console.log('Database & tables created!');
    });
  
  module.exports = {
    Party,
    Profile,
    Message
  };