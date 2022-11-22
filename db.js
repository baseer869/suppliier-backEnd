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
        host: "staging.cqtdp0nlkbdj.ap-northeast-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  } else if(process.env.ENV === 'production') {
    sequelize = new Sequelize(
      "resello-production",
      "resellods",
      "resello1122@A",
      {
        host: "production.cqtdp0nlkbdj.ap-northeast-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
