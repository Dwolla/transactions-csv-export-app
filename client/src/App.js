import { useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';

const App = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [csv, setCsv] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();

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
        Accept: 'text/csv'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(data => {
        if (data['err']) {
          setError(data['err']);
        } else {
          setCsv(data);
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

      <CSVLink data={csv}>Download me</CSVLink>
    </div>
  );
};

export default App;
