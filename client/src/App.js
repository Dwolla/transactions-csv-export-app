import { useState } from 'react';
import { CSVLink } from 'react-csv';
import Form from './Form';

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
    <div className='App flex flex-col w-1/4'>
      <div className='grid place-items-center h-screen'>
        <div>
          {error && <h3>{error}</h3>}
          <h2 className='font-bold text-xl'>
            Customer Transaction Report
          </h2>
        </div>
        <div className='border border-blue-500 rounded-xl p-14'>
          <form onSubmit={onSubmit}>
            <label htmlFor='clientId'>Client ID</label>
            <input
              type='password'
              placeholder='**********************'
              id='clientId'
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
              required
            />
            <label htmlFor='clientSecret'>Client secret</label>
            <input
              type='password'
              id='clientSecret'
              placeholder='**********************'
              value={clientSecret}
              onChange={e => setClientSecret(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
              required
            />
            <label htmlFor='customerId'>Customer ID</label>
            <input
              type='text'
              placeholder='Customer ID'
              id='customerId'
              value={customerId}
              onChange={e => setCustomerId(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
              required
            />
            <label htmlFor='startDate'>Start date</label>
            <input
              type='text'
              placeholder='YYYY-MM-DD'
              id='startDate'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
            />
            <label htmlFor='endDate'>End date</label>
            <input
              type='text'
              placeholder='YYYY-MM-DD'
              id='endDate'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </form>
        </div>
        {csv && <CSVLink data={csv}>Download CSV</CSVLink>}
      </div>
    </div>
  );
};

export default App;
