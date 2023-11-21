import { toast } from 'react-toastify';

export const toastError = (msg, mode) => {
  console.log(msg);
  toast.error(msg, {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });
};
