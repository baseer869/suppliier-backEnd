const Sequelize = require("sequelize");

module.exports.sequelize = Sequelize;
module.exports.instance = function () {
  let sequelize;
  if (process.env.ENV === 'localhost') {
    sequelize = new Sequelize( "resello",
    "root",
    "root",
    {
      host: "localhost",
      dialect: "mysql",
    });
   
  } else if(process.env.ENV === 'staging') {
    sequelize = new Sequelize(
      "resello-staging",
      "admin",
      "admin123",
      {
        host: "resello-staging.c89akl5uhanc.ap-south-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  } else if(process.env.ENV === 'production') {
    sequelize = new Sequelize(
      "resello-production",
      "admin",
      "admin123",
      {
        host: "resello-production.c89akl5uhanc.ap-south-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
