import React, { useState } from 'react';

type AuthFormProps = {
  mode: 'signup' | 'login';
};

interface SignupData {
  username: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupData: SignupData = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }
      alert('Signup successful!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred during signup.');
        alert('An unknown error occurred during signup.');
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      window.location.href = response.url;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred during login.');
        alert('An unknown error occurred during login.');
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        void (async () => {
          if (mode === 'signup') {
            await handleSignupSubmit(e);
          } else {
            await handleLoginSubmit(e);
          }
        })();
      }}
    >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

      <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

export default AuthForm;
