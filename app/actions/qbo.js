import QuickBooks from 'node-quickbooks';

function qbPromisify(method, name, ...args) {
  return new Promise((resolve, reject) => {
    //console.log("qbPromisify: name = " + name + ".  args = " + JSON.stringify(args));
    try {
      method(...args, (err, result) => {
        //console.log("qbPromisify: err = " + err + ".  result = " + result);
        if (err) {
            const errJson = JSON.stringify(err).toLowerCase();
            reject(new Error(name + ": " + err.fault.error[0].message + " Args = " + JSON.stringify(args)));
        } else {
            resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

// const customer = await new Promise((resolve, reject) => {
//     qbo.getCustomer('1', (err, customer) => {
//         if (err) {
//             console.error('Error fetching customer:', err.fault.error);
//             reject(err);
//         } else {
//             console.log('Fetched customer:', customer);
//             resolve(customer);
//         }
//     });
// });

export default class QBO extends QuickBooks {
  constructor(session) {
    //console.log('Initializing QBO with session:', session);
    super(
      process.env.QUICKBOOKS_CLIENT_ID,
      process.env.QUICKBOOKS_CLIENT_SECRET,
      session.accessToken,
      false, // no token secret for oAuth 2.0
      session.realmId,
      true, // use the sandbox?
      false, // enable debugging?
      null, // set minorversion, or null for the latest version
      '2.0', //oAuth version
      session.refreshToken
    );
  }

  getCustomer(id) {
    return qbPromisify(super.getCustomer.bind(this), "getCustomer", id);
  }

  findCustomers(options = {}) {
    return qbPromisify(super.findCustomers.bind(this), "findCustomers", options);
  }

  findInvoices(options = {}) {
    return qbPromisify(super.findInvoices.bind(this), "findInvoices", options);
  }
}