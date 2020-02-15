class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((acc, item) => acc + item.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) {
      return console.log("Insufficient fund!");
    }
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log(myAccount);

let t1 = new Withdrawal(50.25, myAccount);
t1.commit();

let t2 = new Withdrawal(9.99, myAccount);
t2.commit();

let t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log(myAccount);

console.log("Balance:", myAccount.balance);
