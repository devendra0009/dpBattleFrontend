import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../../features/theme/themeSlice';
import { BsSun, BsSunFill } from 'react-icons/bs';
import styled from 'styled-components';
import { toastSuccess } from '../toasts/ToastSuccess';

const ThemeToggler = () => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeTogglerContainer >
      {currentTheme === 'light' ? (
        <BsSun onClick={handleToggleTheme} size={35} />
      ) : (
        <BsSunFill onClick={handleToggleTheme} size={35} color='aqua' />
      )}
    </ThemeTogglerContainer>
  );
};

const ThemeTogglerContainer = styled.div`
  /* background-color: red; */
  display: inline-block;
  cursor: pointer;
  /* hover effect bg glowing  */
`;

export default ThemeToggler;
