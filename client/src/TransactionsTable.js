import Transaction from './Transaction';

const TransactionsTable = ({ transactions }) => {
  return (
    <div>
      {transactions.map(transaction => (
        <Transaction transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionsTable;
