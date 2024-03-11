'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setErrorMessage('');
    const res = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.status === 201) {
      router.refresh();
      router.push('/');
    } else {
      const data = await res.json();
      setErrorMessage(data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="m-2 bg-slate-400 rounded"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="m-2 bg-slate-400 rounded"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="m-2 bg-slate-400 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-300 hover:bg-blue-100">
          Create User
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}
