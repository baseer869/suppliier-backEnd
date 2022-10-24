const crypto = require("crypto");
module.exports = function (sequelize, Sequelize) {
  let Model = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
      shipping_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        references: {
          model: "shipping_details",
          key: "id",
        },
      },
      username: {
        type: String,
        trim: true,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: String,
        trim: true,
        allowNull: true,
        defaultValue: null,
      },
      // subscriptionEmail: {
      //   type: String,
      //   trim: true,
      //   allowNull: true,
      //   defaultValue: null,
      // },
      // phone: {
      //   type: Sequelize.BIGINT(20),
      //   allowNull: true,
      //   defaultValue: null,
      // },
      // gender: {
      //     type: Sequelize.ENUM,
      //     values: ['male', 'female'],
      //     defaultValue: null
      // },

      // DOB: {
      //   //type: Sequelize.DATE,
      //   type: Date,  // changed by usman because of date format
      //   defaultValue: null,
      // },
      verify_code: {
        type: Sequelize.NUMBER,
        defaultValue: null,
      },
      password: {
        type: String,
        trim: true,
      },
      // device_token: {
      //   type: String,
      //   trim: true,
      //   defaultValue: null,
      // },
      // device_type: {
      //   type: Sequelize.ENUM,
      //   values: ["ios", "android"],
      //   defaultValue: null,
      // },
      // rating: {
      //   type: Sequelize.FLOAT,
      //   defaultValue: 0.0,
      // },
      // lang: {
      //   type: Sequelize.ENUM,
      //   values: ["en", "ar"],
      //   defaultValue: "en",
      // },
      // allowPush: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: true,
      // },
      last_login: {
        type: String,
        trim: true,
        defaultValue: null,
      },
      reset_token: {
        type: String,
        trim: true,
        defaultValue: null,
      },
      verified: {
        type: Sequelize.ENUM,
        values: ["0", "1", "2"],
        defaultValue: "0",
      },
      status: {
        type: Sequelize.ENUM,
        values: ["0", "1", "2"],
        defaultValue: "0",
      },
      balance:{
        type: Sequelize.INTEGER,
        defaultValue: null,
        
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    }, {
    indexes: [
      {
        unique: true,
        fields: ['email', 'role_id', 'shipping_id']
      }
    ]
  }, {
    tableName: "users",
    getterMethods: {
      username: function (field) {
        return String(this.getDataValue(field) || "").trim();
      },
      // DOB: function (field) {
      //   return String(this.getDataValue(field) || "").trim();
      // },
      phone: function (field) {
        return String(this.getDataValue(field) || "").trim();
      },
      email: function (field) {
        return String(this.getDataValue(field) || "").trim();
      },
      // gender: function (field) {
      //     return String(this.getDataValue(field) || "").trim();
      // },
      // nationality: function (field) {
      //   return String(this.getDataValue(field) || "").trim();
      // },
    },
  }
  );
  Model.prototype.toJSON = function () {
    let attributes = Object.assign({}, this.get());
    delete attributes.password;
    delete attributes.password_reset_token;
    delete attributes.sub_status_code;
    // delete attributes.status;
    if (attributes.role_id == 1) {
      attributes.role_id = "seller";
    } else if (attributes.role_id == 2) {
      attributes.role_id = "user";
    } 
    if (attributes.status == "0") {
      attributes.status = "Inactive";
    } else if (attributes.status == "1") {
      attributes.status = "Active";
    } 
    return attributes;
  };
  Model.prototype.generateAuthKey = function (length) {
    length = parseInt(length) || 40;
    this.auth_key =
      this.id + "___" + crypto.randomBytes(length).toString("hex");
  };
  Model.prototype.generatePassword = function (password) {
    password = String(password).trim();
    this.password = crypto.createHash("sha1").update(password).digest("hex");
  };
  Model.prototype.validatePassword = function (password, hashed) {
    hashed = String(hashed).trim();
    password = String(password).trim();
    if (!hashed || !password || hashed === "" || password === "") {
      return false;
    }
    return crypto.createHash("sha1").update(password).digest("hex") === hashed;
  };
  return Model;
};
