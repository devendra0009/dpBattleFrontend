import { toast } from 'react-toastify';

export const toastWarn = (msg, mode) => {
  console.log(msg);
  toast.warn(msg, {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });
};
