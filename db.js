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
      "i2ackjpo5ojw488d",
      "wzgoarci35f5rib6",
      "pdzj40i91dc64gel",
      {
        host: "au77784bkjx6ipju.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        dialect: "mysql",
      }
    );
  }

  return sequelize;
};
