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
      "resello-staging",
      "resellods",
      "resello1122@A",
      {
        host: "rm-6gjnq5a85b90z52067o.mysql.ap-south-1.rds.aliyuncs.com",
        dialect: "mysql",
      }
    );
  } else if(process.env.ENV === 'production') {
    sequelize = new Sequelize(
      "resello-production",
      "resellods",
      "resello1122@A",
      {
        host: "rm-6gjnq5a85b90z52067o.mysql.ap-south-1.rds.aliyuncs.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
