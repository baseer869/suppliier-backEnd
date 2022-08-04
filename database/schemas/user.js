const crypto = require("crypto");
const Sequelize = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    default: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
   addressTitle:{
    type:  Sequelize.ENUM,
    values: ['home', 'office',],
    defaultValues: "home",
   } ,
    username: {
      type: Sequelize.STRING,
    },
    customerName: {
      type: Sequelize.STRING,
    },
    shopName: {
      type: Sequelize.STRING,
    },
    shopAddress: {
      type: Sequelize.STRING,
    },
    cnicNumber: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      trim: true,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zip: {
      type: Sequelize.INTEGER,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
      trim: true,
    },
  });

  User.prototype.toJSON = function () {
    let attributes = this.get();
    delete attributes.createdAt;
    delete attributes.updatedAt;
    attributes.username == "" || attributes.username == null
      ? (attributes.username = "Annonyoums")
      : "";
    if (attributes.role_id === 1) {
      delete attributes.password;
      delete attributes.email,
        delete attributes.zip,
        delete attributes.address,
        delete attributes.state,
        delete attributes.city,
        delete attributes.token,
        delete attributes.state,
        (attributes.role = "admin");
    }
    if (attributes.role_id === 2) {
      attributes.role = "vendor";
    }
    if (attributes.role_id === 3) {
      (attributes.role = "user"), 
      delete attributes.password;
      delete attributes.role_id;
    }
    return attributes;
  };
  User.prototype.generatePassword = function (password, option) {
    password = String(password).trim();
    this.password = crypto.createHash("sha1").update(password).digest("hex");
  };

  User.prototype.validatePassword = function (password, hashed) {
    password = String(password).trim();
    hashed = String(hashed).trim();
    let validate =
      !password ||
      !hashed ||
      password === "" ||
      hashed === null ||
      password === null;
    if (validate) {
      return false;
    }
    return crypto.createHash("sha1").update(password).digest("hex") === hashed;
  };
  return User;
};
