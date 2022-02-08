import { useState } from 'react';
import { CSVLink } from 'react-csv';

const { REACT_APP_FLASK_BASE_URL } = process.env;

const App = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startAmount, setStartAmount] = useState('');
  const [endAmount, setEndAmount] = useState('');
  const [csv, setCsv] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    setCsv('');
    setError('');

    const body = {};

    // List of params that can be added to body when present
    const params = {
      clientId,
      clientSecret,
      customerId,
      startDate,
      endDate,
      startAmount,
      endAmount
    };

    // dynamically add params to request body
    for (const param in params) {
      if (params[param]) {
        body[param] = params[param];
      }
    }

    // Fetch request goes here
    fetch(REACT_APP_FLASK_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/csv'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(data => {
        try {
          const json_data = JSON.parse(data);
          if ('err' in json_data) {
            setError(json_data['err']);
            setTimeout(() => setError(''), 8000);
          }
        } catch (err) {
          setCsv(data);
        }
      });
  };

  return (
    <>
      <div className='App flex flex-col min-h-screen flex items-center justify-center font-roboto'>
        <div className='grid place-items-center'>
          <div>
            <h2 className='font-bold text-xl'>Customer Transaction Report</h2>
            {error && (
              <h3 className='font-medium text-lg border border-neutral-600 px-4 py-2 text-white bg-red-600 rounded-xl'>
                {error}
              </h3>
            )}
          </div>
          <div className='border border-dwolla-primaryPurple rounded-xl p-14 mt-5'>
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
              <label htmlFor='startAmount'>Start amount</label>
              <input
                type='text'
                placeholder='Minimum transaction value: ex. 500'
                id='startAmount'
                value={startAmount}
                onChange={e => setStartAmount(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
              />
              <label htmlFor='endAmount'>End amount</label>
              <input
                type='text'
                placeholder='Maximum transaction value: ex. 1000'
                id='endAmount'
                value={endAmount}
                onChange={e => setEndAmount(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline mb-6'
              />
              <button
                type='submit'
                className='bg-dwolla-primaryPurple hover:bg-dwolla-purpleTint5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </form>
          </div>
          {csv && (
            <CSVLink
              className='border bg-dwolla-primaryPurple hover:bg-dwolla-purpleTint5 mt-3 p-4 text-white rounded'
              data={csv}
            >
              Download CSV
            </CSVLink>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
