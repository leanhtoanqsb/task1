import React, { useState } from 'react';
import {
  validateConfirmPassword,
  validateFullName,
  validatePassword,
  validateUsername,
} from '../libs/mainValidate';
import { addUser, loginUser } from '../database';
import { toast } from 'material-react-toastify';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [loginUsernameInput, setLoginUsernameInput] = useState('');
  const [loginPasswordInput, setLoginPasswordInput] = useState('');

  // Error Login State
  const [loginUsernameError, setLoginUsernameError] = useState(false);
  const [errorLoginUsernameInput, setErrorLoginUsernameInput] = useState('');

  const [loginPasswordError, setLoginPasswordError] = useState(false);
  const [errorLoginPasswordInput, setErrorLoginPasswordInput] = useState('');

  const [registerUsernameInput, setRegisterUsernameInput] = useState('');
  const [registerPasswordInput, setRegisterPasswordInput] = useState('');
  const [registerConfirmPasswordInput, setRegisterConfirmPasswordInput] =
    useState('');
  const [registerFullnameInput, setRegisterFullnameInput] = useState('');

  // Error Register State
  const [registerFullnameError, setRegisterFullnameError] = useState(true);
  const [errorRegisterFullnameInput, setErrorRegisterFullnameInput] =
    useState('');

  const [registerUsernameError, setRegisterUsernameError] = useState(true);
  const [errorRegisterUsernameInput, setErrorRegisterUsernameInput] =
    useState('');

  const [registerPasswordError, setRegisterPasswordError] = useState(true);
  const [errorRegisterPasswordInput, setErrorRegisterPasswordInput] =
    useState('');

  const [registerConfirmPasswordError, setRegisterConfirmPasswordError] =
    useState(true);
  const [
    errorRegisterConfirmPasswordInput,
    setErrorRegisterConfirmPasswordInput,
  ] = useState('');

  const [loginProgress, setLoginProgress] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(false);

  const errorRegister =
    registerFullnameError ||
    registerUsernameError ||
    registerPasswordError ||
    registerConfirmPasswordError;

  const errorLogin = loginUsernameError || loginPasswordError;

  const isLogin = localStorage.getItem('isLogin');
  if (isLogin === 'true') return <Redirect to="/welcome" />;

  const handleRegisterFullnameChecked = (e) => {
    e.preventDefault();
    setRegisterFullnameInput(e.target.value);
    if (!validateFullName(registerFullnameInput)) {
      setRegisterFullnameError(true);
      setErrorRegisterFullnameInput('Tên không hợp lệ');
    } else {
      setRegisterFullnameError(false);
      setErrorRegisterFullnameInput('');
    }
  };

  const handleRegisterUsernameChecked = (e) => {
    e.preventDefault();
    setRegisterUsernameInput(e.target.value);
    if (!validateUsername(registerUsernameInput)) {
      setRegisterUsernameError(true);
      setErrorRegisterUsernameInput('Tên đăng nhập không hợp lệ');
    } else {
      setRegisterUsernameError(false);
      setErrorRegisterUsernameInput('');
    }
  };

  const handleRegisterPasswordChecked = (e) => {
    e.preventDefault();
    setRegisterPasswordInput(e.target.value);
    if (!validatePassword(e.target.value)) {
      setRegisterPasswordError(true);
      setErrorRegisterPasswordInput('Mật khẩu phải trên 6 ký tự');
    } else {
      setRegisterPasswordError(false);
      setErrorRegisterPasswordInput('');
    }

    if (
      !validateConfirmPassword(registerConfirmPasswordInput, e.target.value)
    ) {
      setRegisterConfirmPasswordError(true);
      setErrorRegisterConfirmPasswordInput('Mật khẩu không giống nhau');
    }
  };

  const handleRegisterConfirmPasswordChecked = (e) => {
    e.preventDefault();
    setRegisterConfirmPasswordInput(e.target.value);
    if (!validateConfirmPassword(registerPasswordInput, e.target.value)) {
      setRegisterConfirmPasswordError(true);
      setErrorRegisterConfirmPasswordInput('Mật khẩu không giống nhau');
    } else {
      setRegisterConfirmPasswordError(false);
      setErrorRegisterConfirmPasswordInput('');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterProgress(true);
    setTimeout(() => {
      const register = addUser({
        username: registerUsernameInput,
        fullname: registerFullnameInput,
        password: registerPasswordInput,
        confirmPassword: registerConfirmPasswordInput,
      });
      if (register.code !== 200)
        return toast.error(register.message) && setRegisterProgress(false);

      toast.success(register.message);
      return setRegisterProgress(false);
    }, 500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginProgress(true);
    setTimeout(() => {
      const login = loginUser({
        username: loginUsernameInput,
        password: loginPasswordInput,
      });
      if (login.code !== 200)
        return toast.error(login.message) && setLoginProgress(false);

      toast.success(login.message);
      return setLoginProgress(false);
    }, 500);
  };

  const handleLoginUsernameChecked = (e) => {
    e.preventDefault();
    setLoginUsernameInput(e.target.value);
    if (!validateUsername(e.target.value)) {
      setLoginUsernameError(true);
      setErrorLoginUsernameInput('Tên đăng nhập không hợp lệ');
    } else {
      setLoginUsernameError(false);
      setErrorLoginUsernameInput('');
    }
  };

  const handleLoginPasswordChecked = (e) => {
    e.preventDefault();
    setLoginPasswordInput(e.target.value);
    if (!validatePassword(e.target.value)) {
      setLoginPasswordError(true);
      setErrorLoginPasswordInput('Mật khẩu phải lớn hơn 6 ký tự');
    } else {
      setLoginPasswordError(false);
      setErrorLoginPasswordInput('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-around pt-20 px-2 md:px-0 md:space-x-10">
        {/* Login */}
        <div className="w-full py-4 mb-12 px-2">
          <h2 className="text-2xl text-center mb-4">Login</h2>
          <form action="" onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleLoginUsernameChecked}
                placeholder="Your username ..."
              />
              {errorLoginUsernameInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorLoginUsernameInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleLoginPasswordChecked}
                placeholder="Your password ..."
              />
              {errorLoginPasswordInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorLoginPasswordInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <button
                type="password"
                className={`border-black ${
                  loginProgress ? 'bg-gray-700' : 'bg-black'
                } text-white border w-full outline-none py-2 px-2 font-semibold text-center rounded-sm`}
                disabled={errorLogin || loginProgress}
              >
                {loginProgress ? 'In Progress' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        {/* Register */}
        <div className="w-full py-4 mb-12 px-2">
          <h2 className="text-2xl text-center mb-4">Register</h2>
          <form action="" onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleRegisterFullnameChecked}
                placeholder="Your fullname ..."
              />
              {errorRegisterFullnameInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorRegisterFullnameInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleRegisterUsernameChecked}
                placeholder="Your username ..."
              />
              {errorRegisterUsernameInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorRegisterUsernameInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleRegisterPasswordChecked}
                placeholder="Your password ..."
              />
              {errorRegisterPasswordInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorRegisterPasswordInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border-black border w-full outline-none py-2 px-2 font-semibold rounded-sm"
                onChange={handleRegisterConfirmPasswordChecked}
                placeholder="Confirm password ..."
              />
              {errorRegisterConfirmPasswordInput.length !== 0 ? (
                <span className="text-red-400 text-sm font-semibold">
                  {errorRegisterConfirmPasswordInput}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4">
              <button
                type="password"
                className={`border-black ${
                  registerProgress ? 'bg-gray-700' : 'bg-black'
                } text-white border w-full outline-none py-2 px-2 font-semibold text-center rounded-sm`}
                disabled={errorRegister || registerProgress}
              >
                {registerProgress ? 'In Progress' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
