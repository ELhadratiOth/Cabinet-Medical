import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../assets/im3.png';
import Img2 from '../assets/lg.png';
import {
  RiDoubleQuotesL,
  RiDoubleQuotesR,
  RiEyeLine,
  RiEyeOffLine,
} from 'react-icons/ri';
import { HR } from 'flowbite-react';

export default function LogPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Please enter username and password');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const formDetails = new URLSearchParams();
      formDetails.append('grant_type', 'password');
      formDetails.append('username', username);
      formDetails.append('password', password);
      formDetails.append('scope', '');
      formDetails.append('client_id', 'string');
      formDetails.append('client_secret', 'string');

      try {
        const response = await fetch('http://localhost:8000/user/token', {
          method: 'POST',
          body: formDetails,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });

        setLoading(false);

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          navigate('/home');
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Invalid username or password');
        }
      } catch (error) {
        setLoading(false);
        console.error('An error occurred:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative  flex h-32 items-end justify-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src={Img}
            className="absolute  inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="lg:relative lg:block mb-6">
            <div className="bg-black/50 py-2 px-12 shadow-md rounded-lg backdrop-blur-sm">
              <h2 className="mb-3 text-2xl -ml-8 font-bold text-white sm:text-3xl md:text-4xl">
                Quote Of The Day
              </h2>
              <div className="relative ml-14 flex justify-center items-center text-white/90 p-6 pb-2 rounded-lg bg-transparent">
                <RiDoubleQuotesL className="absolute top-3 left-2 text-2xl text-white/70" />
                <p className="my-2 leading-relaxed text-base font-semibold text-center w-max">
                  He who has health has hope and he who has hope has everything.
                  <span className="block mt-2 font-bold text-sm">
                    - Arabian Proverb
                  </span>
                </p>
                <RiDoubleQuotesR className="absolute bottom-4 right-2 text-2xl text-white/70" />
              </div>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 bg-[#edfaff] sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" bg-white/20 backdrop-blur-xl rounded-lg p-8 pt-4 shadow-lg w-full max-w-md">
            <div className="flex justify-center flex-col items-center mb-6">
              <img
                src={Img2}
                alt="error"
                className="h-32 object-cover opacity-80 drop-shadow-md"
              />
              <div className="self-start font-bold text-3xl ">
                Log in{' '}
                <HR.Trimmed className="bg-blue-200 md:w-[7rem] md:mx-0 md:mt-2 md:mb-0" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="relative block border-b border-blue-300 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                    className="peer h-10 w-full border-none bg-transparent focus:bg-blue-50 p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                  <span
                    className={`absolute start-0 top-0 -translate-y-1/2 text-base text-gray-600 transition-all ${
                      username
                        ? 'text-xs'
                        : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'
                    }`}
                  >
                    Username
                  </span>
                </label>
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="relative block  border-b border-blue-300 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    className="peer h-10 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:bg-blue-50 focus:outline-none focus:ring-0 sm:text-sm"
                  />
                  <span
                    className={`absolute start-0 top-0 -translate-y-1/2 text-base text-gray-600 transition-all ${
                      password
                        ? 'text-xs'
                        : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'
                    }`}
                  >
                    Password
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <RiEyeOffLine className="text-2xl mt-3" />
                  ) : (
                    <RiEyeLine className="text-2xl mt-3" />
                  )}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-block w-full rounded-md  ring  ring-blue-400 bg-blue-300 px-12 py-3 text-base font-medium text-black transition duration-500 hover:bg-blue-200  focus:outline-none focus:ring active:text-blue-500"
              >
                {loading ? <span>Loading...</span> : 'Log in'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
