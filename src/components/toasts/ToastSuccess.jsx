import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectTheme } from '../../features/theme/themeSlice';


export const toastSuccess = (msg,icon,currentTheme) => {
console.log(currentTheme);
  toast.success(msg, {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme:currentTheme==='light'?'light':'dark',
    icon: icon
  });
};
