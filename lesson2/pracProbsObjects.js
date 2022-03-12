'use strict'

let invoices = {
  unpaid: [],

  add(client, amount) {
    this.unpaid.push({ client, amount });
  }
};

// console.log(invoices.unpaid);
// invoices.add('Starbucks', 300);
// invoices.add('Apple', 1300);
// console.log(invoices.unpaid);

invoices.totalDue = function() {
  return this.unpaid.reduce((total, inv) => total + inv.amount, 0);
};

// console.log(invoices.totalDue());

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

// console.log(invoices.totalDue());

invoices.paid = [];
invoices.payInvoice = function(client) {
  let unpaid = [];
  this.unpaid.forEach(invoice => {
    (client === invoice.client) ? this.paid.push(invoice) : unpaid.push(invoice);
  });

  this.unpaid = unpaid;
};

// console.log(invoices.unpaid);
// console.log(invoices.paid);

// invoices.payInvoice('Moonbeam Interactive');

// console.log(invoices.unpaid);
// console.log(invoices.paid);

invoices.totalPaid = function() {
  return this.paid.reduce((total, inv) => total + inv.amount, 0);
};

// console.log(invoices.paid);
// console.log(invoices.totalPaid());

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');

console.log(invoices.totalPaid());
console.log(invoices.totalDue());



