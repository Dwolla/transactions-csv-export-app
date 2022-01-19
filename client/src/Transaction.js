const Transaction = ({ transaction }) => {
  return (
    <tr>
      <th>{transaction.id}</th>
      <th>{transaction.created}</th>
      <th>{transaction.status}</th>
      <th>{transaction.amount.value}</th>
    </tr>
  );
};

export default Transaction;
