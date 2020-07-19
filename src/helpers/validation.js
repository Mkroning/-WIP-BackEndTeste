import env from '../../env';
import jwt from 'jsonwevtoken';

const isValidEmail = (email) =>{
  const regEx =  / \ S + @ \ S + \ . \ S + / ;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.lenght <= 5 || password === '') {
    return false;
  }return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === ''){
    return true;
  }
  if (input.replace(/ \ s / g , ''.lenght)){ 
    return false; 
  }return true;
};

const empty = (input) => {
  if (input === undefined || input === ''){
    return true;
  }
};

const generateUserToken = (email, id, is_admin, first_name, last_name) => {
  const token = jwt.sign({
    email,
    user_id: id,
    is_admin,
    first_name,
    last_name
  },
  env.secret, { expiresIn: '3d'});
  return token;
}


export {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
};

