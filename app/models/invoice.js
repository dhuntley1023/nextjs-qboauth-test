import { Model, DataTypes, Sequelize } from "sequelize";

export class Invoice extends Model {
    static initModel(sequelize) {
        Invoice.init(
            {
                Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
                DocNumber: { type: DataTypes.STRING, allowNull: true },
                //CustomerId: { type: DataTypes.INTEGER, allowNull: true },
                TotalAmt: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
                TxnDate: { type: DataTypes.DATEONLY, allowNull: false },
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

    static async loadFromQuickBooks(qbo) {
        const invoiceResult = await qbo.findInvoices();
        const invoices = invoiceResult.QueryResponse.Invoice;
        invoices.forEach(invoice => {
            invoice.CustomerId = invoice.CustomerRef ? invoice.CustomerRef.value : null;
        });
        //console.log('Customer: Fetched invoices:', invoices);
        await Invoice.bulkCreate(invoices);

        return await Invoice.count();
    }

}