import React, { useState } from 'react';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // Example: Authenticate user with username and password
    console.log('Username:', username);
    console.log('Password:', password);
    // You can replace the console.log statements with your actual login logic
    setIsAuthenticated(true);
  };

  return (
    <div>
      <form>
        <div className='login-page' >
            <div className="logo-container">
                <img 
                src="../../assets/naptip-logo.png" alt="Logo" className='logo' />
            </div>
            <div className="form-container">
                <h2>Login</h2>
                <p>Enter your details to continue</p>
                <form action="">
                    <div>
                    <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder='Enter your username'
            style={{marginBottom: '10px', flexDirection: 'column', display: 'flex'}}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder='Enter your password'
            style={{marginBottom: '10px', flexDirection: 'column', display: 'flex'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
                    </div>
                </form>
            </div>
            <button type="button" onClick={handleLogin}>
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
