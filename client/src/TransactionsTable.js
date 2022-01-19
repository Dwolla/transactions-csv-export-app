import Transaction from './Transaction';

const TransactionsTable = ({ transactions }) => {
  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </table>
    </div>
  );
};

export default TransactionsTable;
