import { Sequelize } from "sequelize";
import { Account } from "./account.js";
import { Customer } from "./customer.js";
import { Invoice } from "./invoice.js";

const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './temp.db',
      logging: false
    });

const models = {
  Account,
  Customer,
  Invoice,
};

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

await sequelize.sync({force: true});

export { sequelize, models };

try { 
    await Customer.create({Id: 1, DisplayName: 'David' });
    await Invoice.create({Id: 1, DocNumber: 'INV-001', TotalAmt: 100.00, CustomerId: 1});
} catch (error) {
  console.error("Error creating Invoice:", error);
  process.exit(1);
}

console.log(JSON.stringify(await Invoice.findAll({include: [Customer]}), null, 2));