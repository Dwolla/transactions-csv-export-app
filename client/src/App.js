import { useState } from 'react';

const App = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const body = {};

    const params = {
      clientId,
      clientSecret,
      customerId,
      startDate,
      endDate,
    };

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
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <div className='App'>
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
