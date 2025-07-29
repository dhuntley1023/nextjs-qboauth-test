import { Model, DataTypes, Sequelize } from "sequelize";

export class Invoice extends Model {
  static initModel(sequelize) {
    Invoice.init(
      {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        DocNumber: { type: DataTypes.STRING, allowNull: true },
        //CustomerId: { type: DataTypes.INTEGER, allowNull: true },
        TotalAmt: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      },
      {
        sequelize,
        modelName: "Invoice",
        tableName: "Invoices",
      }
    );
  }

  static associate(models) {
    Invoice.belongsTo(models.Customer);
  }
}