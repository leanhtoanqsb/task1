import {
  validateConfirmPassword,
  validateFullName,
} from '../libs/mainValidate';
import { v4 as uuidv4 } from 'uuid';

const insertDefaultDB = () => {
  let DB = localStorage.getItem('database');
  if (DB === null) {
    const databaseDefault = {
      data: {
        user: [],
        task: [],
        taskRegister: [],
      },
    };
    localStorage.setItem('database', JSON.stringify(databaseDefault));
    localStorage.setItem('isLogin', false);
    DB = databaseDefault;
    console.log('INSERT DEFAULT DATABASE SUCCESSFULLY');
  }
};

const getDB = () => {
  const DB = JSON.parse(localStorage.getItem('database'));
  console.log('DATABASE', DB);
  return DB;
};

const getMyTasks = () => {
  const DB = Object.entries(getDB().data.task);
  const session = getSession();
  return DB.filter(([key, value]) => value.owner === session.username);
};

//get all task
const getAllTask = () => {
  const DB = getDB().data.task;
  return DB
};

const findTaskByCode = (code) => {
  const DB = Object.entries(getDB().data.task);
  const filter = DB.filter(([key, value]) => value.code === code);
  if (filter.length === 0) return false;
  return filter;
};

const getSession = () => {
  const SESSION = JSON.parse(localStorage.getItem('session'));
  return SESSION;
};

const getOnceUserData = (username) => {
  const DB = Object.entries(getDB().data.user);
  const filter = DB.filter(([key, value]) => value.username === username);
  if (filter.length === 0) return false;
  return filter;
};

const findUserByUsername = (username) => {
  const DB = Object.entries(getDB().data.user);
  const filter = DB.filter(([key, value]) => value.username === username);
  if (filter.length === 0) return false;
  return true;
};

const validateUserRegister = (
  username,
  password,
  confirmPassword,
  fullname
) => {
  if (!username) return 'Không được bỏ trống tên đăng nhập';
  if (!password) return 'Không được bỏ trống tên mật khẩu';
  if (username.length <= 6 || password.length <= 6)
    return 'Tài khoản & mật khẩu phải trên 6 ký tự';

  console.log(password, confirmPassword);
  if (!validateConfirmPassword(password, confirmPassword))
    return 'Xác nhận mật khẩu không chính xác';
  if (!validateFullName(fullname)) return 'Tên hiển thị không hợp lệ';

  return null;
};

const validateUserLogin = (username, password, confirmPassword, fullname) => {
  if (!username) return 'Không được bỏ trống tên đăng nhập';
  if (!password) return 'Không được bỏ trống tên mật khẩu';
  if (username.length <= 6 || password.length <= 6)
    return 'Tài khoản & mật khẩu phải trên 6 ký tự';

  return null;
};

const logoutUser = () => {
  localStorage.setItem('isLogin', false);
  localStorage.setItem('session', '');
  return true;
};

const loginUser = ({ username, password }) => {
  insertDefaultDB();
  const validate = validateUserLogin(username, password);
  if (validate !== null)
    return {
      code: 400,
      message: validate,
    };

  if (!findUserByUsername(username))
    return {
      code: 400,
      message: 'Không có tài khoản này',
    };

  const accountData = getOnceUserData(username)[0][1];
  if (password !== accountData.password)
    return {
      code: 400,
      message: 'Sai mật khẩu',
    };
  localStorage.setItem('isLogin', true);
  localStorage.setItem('session', JSON.stringify(accountData));
  return {
    code: 200,
    message: 'Đăng nhập thành công',
  };
};

const addJob = ({ title, desc, imgs, skills, price, days }) => {
  if (!title)
    return {
      code: 400,
      message: 'Tên dự án không được bỏ trống',
    };
  if (!desc)
    return {
      code: 400,
      message: 'Mô tả dự án không được bỏ trống',
    };
  if (!skills || skills.length === 0)
    return {
      code: 400,
      message: 'Vui lòng chọn ít nhất một kĩ năng trong dự án của bạn',
    };
  const currentDB = getDB();
  const session = getSession();
  const job = {
    owner: session.username,
    code: uuidv4(),
    description: desc,
    title,
    skills,
    createdAt: new Date(),
    end: days,
    price,
    imgs,
  };
  const newDB = {
    data: {
      user: [...currentDB.data.user],
      task: [...currentDB.data.task, job],
      taskRegister: [...currentDB.data.taskRegister],
    },
  };
  localStorage.setItem('database', JSON.stringify(newDB));
  return {
    code: 200,
    message: 'Đăng dự án thành công',
  };
};

const addUser = ({ username, password, fullname, confirmPassword }) => {
  insertDefaultDB();
  const validate = validateUserRegister(
    username,
    password,
    confirmPassword,
    fullname
  );
  if (validate !== null)
    return {
      code: 400,
      message: validate,
    };
  if (findUserByUsername(username))
    return {
      code: 400,
      message: 'Tài khoản đã được đăng ký',
    };

  const currentDB = getDB();
  const dataUser = {
    username,
    password,
    fullname,
    skills: [],
    address: '',
    bio: '',
    createdAt: new Date(),
    bid: 6,
  };
  const newDB = {
    data: {
      user: [...currentDB.data.user, dataUser],
      task: [...currentDB.data.task],
      taskRegister: [...currentDB.data.taskRegister],
    },
  };
  localStorage.setItem('database', JSON.stringify(newDB));
  localStorage.setItem('isLogin', true);
  localStorage.setItem('session', JSON.stringify(dataUser));
  return {
    code: 200,
    message: 'Đăng ký tài khoản thành công',
  };
};

//get user
const getUser = () => {
  const DB = getDB().data.user;
  const session = getSession();
  const userData =  DB.filter(user => user.username === session.username);
  return userData[0]
};

export {
  insertDefaultDB,
  getDB,
  addJob,
  addUser,
  loginUser,
  findUserByUsername,
  getMyTasks,
  logoutUser,
  findTaskByCode,
  getSession,
  getAllTask,
  getUser,
};
