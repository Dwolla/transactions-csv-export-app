const Form = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <h2>Customer Transactions Report</h2>
      <form>
        <label htmlFor='clientId'>Client ID</label>
        <input
          id='clientId'
          type='password'
          required
          placeholder='******************'
          required
        />
        <label htmlFor='clientSecret'>Client secret</label>
        <input
          id='clientSecret'
          type='password'
          required
          placeholder='******************'
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
