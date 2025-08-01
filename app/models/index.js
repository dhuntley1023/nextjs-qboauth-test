//'use server'

import sqlite3 from 'sqlite3';
import { Sequelize, Op } from "sequelize";
import { Account } from "./account.js";
import { Customer } from "./customer.js";
import { Invoice } from "./invoice.js";
import { Vendor } from "./vendor";
import QBO from '../actions/qbo.js';
import { Session } from '../actions/session.js';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: '',
    logging: false
});

const models = {
    Account,
    Customer,
    Invoice,
    Vendor
};


export async function initializeDatabase() {
    console.log("Initializing database...");


    // Initialize all models
    Object.values(models).forEach((model) => {
        if ("initModel" in model) {
            console.log(`Initializing model: ${model.name}`);
            model.initModel(sequelize);
        }
    });

    // Setup associations
    Object.values(models).forEach((model) => {
        if ("associate" in model) {
            console.log(`Associating model: ${model.name}`);
            model.associate(models);
        }
    });

    await sequelize.sync({ force: true });

    try {
        const session = new Session();
        await session.fetch();
        //console.log('Customer: Session:', session);

        if (!session.isReady()) {
            throw (new Error('Customer: Session is not ready. Cannot load db.'));
        } else {
            const qbo = new QBO(session);
            //console.log('Customer: QBO:', qbo);

            // Initialize all models
            for (const model of Object.values(models)) {
                if ("loadFromQuickBooks" in model) {
                    console.log(`Loading from QuickBooks: ${model.name}`);
                    const count = await model.loadFromQuickBooks(qbo);
                    console.log(`Loaded ${count} records`);
                }
            }

            // Object.values(models).forEach(async (model) => {
            //     if ("loadFromQuickBooks" in model) {
            //         console.log(`Loading from QuickBooks: ${model.name}`);
            //         const count = await model.loadFromQuickBooks(qbo);
            //         console.log(`Loaded ${count} records`);
            //     }
            // });

            // const customerCount = await Customer.loadFromQuickBooks(qbo);
            // console.log(`Loaded ${customerCount} customers from QuickBooks.`);
            // const invoiceCount = await Invoice.loadFromQuickBooks(qbo);
            // console.log(`Loaded ${invoiceCount} invoices from QuickBooks.`);
            // //await Invoice.create({Id: 1, DocNumber: 'INV-001', TotalAmt: 100.00, CustomerId: 1});
        }
    } catch (error) {
        console.error("Error loading database:" + error.message);
    }

    // const recordsFound = await Account.count({
    //     group: [
    //         sequelize.col('AccountType'),
    //         sequelize.col('AccountSubType') 
    //     ],
    // });
    // console.log(JSON.stringify(recordsFound.sort((a,b)=>a.count-b.count), null, 2));

    const recordsFound = await Account.findAll({
        attributes:
            [
                'AccountType', 'AccountSubType',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'userCount']
            ],
        group: ['AccountType', 'AccountSubType'],
        order: [[Sequelize.literal('userCount'), 'ASC']]
    });
    //console.log(JSON.stringify(recordsFound, null, 2));
    console.log("Database initialization complete")
}
