class Customer {
  constructor(name, initialBalance) {
    this.name = name;
    this.balance = initialBalance;
  }
  addCash(cash) {
    if (cash <= 0) {
      console.log("add sufficiant balance.");
      return;
    }
    this.balance += cash;
    console.log(
      `your current balance is ${this.balance}.thank you for visiting us.`,
    );
  }
  withdrawCash(cash) {
    if (cash <= 0 || this.balance - cash < 0) {
      console.log("you enter negative amount or not sufficiant balance.");
      return;
    }
    this.balance -= cash;
    console.log(
      `your current balance is ${this.balance}.thank you for visiting us.`,
    );
  }
}

const a = new Customer("om", 20);

console.log(a.name, a.balance);
a.addCash(2);
a.withdrawCash(22);
a.withdrawCash(1);
