import { toast } from 'react-toastify';

export const toastWarn = (msg, icon,currentTheme) => {
  console.log(msg);
  toast.warn(msg, {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme:currentTheme==='light'?'light':'dark',
    progress: 0,
    icon: icon
  });
};
