import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balanceTotal = this.transactions.reduce((previous, current) => {
      const previousBalance = previous;

      previousBalance[current.type] += current.value;

      if (current.type === 'income') previousBalance.total += current.value;
      else previousBalance.total -= current.value;

      return previousBalance;
    }, balance);

    return balanceTotal;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
