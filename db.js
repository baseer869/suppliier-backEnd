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
      "d6ymkjmto6tnjbi6",
      "ikau2orkumvp0i9r",
      "pd3uobzdw4tuxhrw",
      {
        host: "nuepp3ddzwtnggom.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
