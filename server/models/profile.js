const { Sequelize } = require("sequelize");

const db = require("./db");

const Profile = db.define("profile", {
  specialization: {
    type: Sequelize.DataTypes.STRING,
  },
  adress: {
    type: Sequelize.DataTypes.STRING, 
  },
  workingHours: {
    type: Sequelize.DataTypes.STRING,
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
  },
});

Profile.associate = (models) => {
  Profile.belongsTo(models.User);
};

module.exports = Profile;
