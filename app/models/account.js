import { Model, DataTypes, Sequelize } from "sequelize";

export class Account extends Model {
  static initModel(sequelize) {
    Account.init(
      {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        Name: { type: DataTypes.STRING, allowNull: false },
        Classification: { type: DataTypes.STRING, allowNull: true },
        AccountType: { type: DataTypes.STRING, allowNull: true },
        AccountSubType: { type: DataTypes.STRING, allowNull: true },
        CurrentBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      },
      {
        sequelize,
        modelName: "Account",
        tableName: "Accounts",
      }
    );
  }

  static associate(models) {
    //User.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
  }
}