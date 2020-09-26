import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type == 'outcome' && value >= total) {
      throw Error(`you have no funds!`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      type: type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
