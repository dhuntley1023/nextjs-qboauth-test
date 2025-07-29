import { Model, DataTypes, Sequelize } from "sequelize";

export class Customer extends Model {
  static initModel(sequelize) {
    Customer.init(
      {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        DisplayName: { type: DataTypes.STRING, allowNull: false },
      },
      {
        sequelize,
        modelName: "Customer",
        tableName: "Customers",
      }
    );
  }

  static associate(models) {
    Customer.hasMany(models.Invoice);
  }
}