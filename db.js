const Sequelize = require("sequelize");

module.exports.sequelize = Sequelize;
module.exports.instance = function () {
  let sequelize;
  if (process.env.ENV === 'development') {
    sequelize = new Sequelize("suppliier", "root", "root", {
      host: "localhost",
      dialect: "mysql",
    });
   
  } else if(process.env.ENV === 'staging') {
    sequelize = new Sequelize(
      "kclpzjl4k26ckd6e",
      "knloqgrr1hzptv94",
      "w8x5bwxam1e56hqd",
      {
        host: "bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
