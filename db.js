const Sequelize = require("sequelize");

module.exports.sequelize = Sequelize;
module.exports.instance = function () {
  let sequelize;
  if (process.env.ENV === 'localhost') {
    sequelize = new Sequelize("resello", "root", "root", {
      host: "localhost",
      dialect: "mysql",
    });
   
  } else if(process.env.ENV === 'staging') {
    sequelize = new Sequelize(
      "resello",
      "admin",
      "resello123",
      {
        host: "resello.cnbseomd77zp.us-east-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
