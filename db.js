const Sequelize = require("sequelize");

module.exports.sequelize = Sequelize;
module.exports.instance = function () {
  let sequelize;
  if (process.env.ENV === 'localhost') {
    sequelize = new Sequelize( "epiz_33044828_staging",
    "epiz_33044828",
    "kuPSP8eAvRfKmv",
    {
      host: "sql205.epizy.com",
      dialect: "mysql",
    });
    console.log('sequelize', sequelize);
   
  } else if(process.env.ENV === 'staging') {
    console.log('staging');
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
        host: "production.cqtdp0nlkbdj.ap-northeast-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
