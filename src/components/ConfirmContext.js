import {createContext} from 'react';
const options = {
  show: false,
  message: null,
};
const ConfirmContext = createContext(options);
export default ConfirmContext;
