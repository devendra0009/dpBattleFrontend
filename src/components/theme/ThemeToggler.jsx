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
        <BsSun className='sun' onClick={handleToggleTheme} size={30} />
      ) : (
        <BsSunFill className='sunfill' onClick={handleToggleTheme} size={30} color='aqua' />
      )}
    </ThemeTogglerContainer>
  );
};

const ThemeTogglerContainer = styled.div`
  /* background-color: red; */
  display: inline-block;
  cursor: pointer;
  @media (max-width: 430px) {
    .sun{
      width: 25px;
    }
    .sunfill{
      width: 25px;

    }
  }
  /* hover effect bg glowing  */
`;

export default ThemeToggler;
