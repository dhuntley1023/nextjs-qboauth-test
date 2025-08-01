import { Model, DataTypes, Sequelize } from "sequelize";


export class Customer extends Model {
    static initModel(sequelize) {
        Customer.init(
            {
                Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
                DisplayName: { type: DataTypes.STRING, allowNull: false },
                Active: { type: DataTypes.BOOLEAN, allowNull: true },
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

    static async loadFromQuickBooks(qbo) {
        const customers = await qbo.findCustomers({ fetchAll: true });
        //console.log('Customer: Fetched customer:', customers.QueryResponse.Customer);
        await Customer.bulkCreate(customers.QueryResponse.Customer);

        return await Customer.count();
    }
}