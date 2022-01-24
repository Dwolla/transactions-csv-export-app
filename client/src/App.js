import { useState } from 'react';

const App = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    setTransactions([]);
    const body = {};

    // List of params that can be added to body when present
    const params = {
      clientId,
      clientSecret,
      customerId,
      startDate,
      endDate
    };

    // dynamically add params to request body
    for (const param in params) {
      if (params[param]) {
        body[param] = params[param];
      }
    }

    // Fetch request goes here
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if ('err' in data) {
          setError(data['err']);
        } else {
          setTransactions(data['body']['_embedded']['transfers']);
        }
      });
  };

  return (
    <div className='App'>
      {error && <h3>{error}</h3>}
      <h2>Customer Transaction Report</h2>
      <form onSubmit={onSubmit}>
        <input
          type='password'
          placeholder='Client ID'
          value={clientId}
          onChange={e => setClientId(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Client secret'
          value={clientSecret}
          onChange={e => setClientSecret(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Customer ID'
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Start date: YYYY-MM-DD'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type='text'
          placeholder='End date: YYYY-MM-DD'
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default App;
