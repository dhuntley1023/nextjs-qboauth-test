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

    static async loadFromQuickBooks(qbo) {
        const accounts = await qbo.findAccounts({ fetchAll: true });
        //console.log('Account: Fetched Account:', accounts.QueryResponse.Account);
        await Account.bulkCreate(accounts.QueryResponse.Account);

        return await Account.count();
    }

    static async getAccount(id) {
        const account = await Account.findByPk(id);
        if (account === null) {
            throw(new Error(`getAccount: ID ${id} doesn't exist`))
        }
        return account;
    }
}