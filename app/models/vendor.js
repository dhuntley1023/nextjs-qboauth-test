import { Model, DataTypes } from "sequelize";


export class Vendor extends Model {
    static initModel(sequelize) {
        Vendor.init(
            {
                Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
                DisplayName: { type: DataTypes.STRING, allowNull: false },
                Active: { type: DataTypes.BOOLEAN, allowNull: true },
            },
            {
                sequelize,
                modelName: "Vendor",
                tableName: "Vendors",
            }
        );
    }

    static associate(models) {
        //Vendor.hasMany(models.Invoice);
    }

    static async loadFromQuickBooks(qbo) {
        const Vendors = await qbo.findVendors({ fetchAll: true });
        //console.log('Vendor: Fetched Vendor:', Vendors.QueryResponse.Vendor);
        await Vendor.bulkCreate(Vendors.QueryResponse.Vendor);

        return await Vendor.count();
    }
}