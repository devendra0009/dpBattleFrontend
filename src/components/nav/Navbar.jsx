// import React from 'react'
import styled from 'styled-components';
import ThemeToggler from '../theme/ThemeToggler';
import logo from '../../../public/assets/dpbattleicon.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectTheme } from '../../features/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdExit } from 'react-icons/io';
import { logoutUserAsync } from '../../features/auth/authSlice';
import { SearchInput } from '../../styled-components/inputs/Input';
import { MdOutlinePersonSearch } from 'react-icons/md';
import {
  clearSearchedUser,
  clearUserState,
  selectSearchedUser,
  setSearchedUser,
} from '../../features/user/userSlice';
import SearchedUsers from '../../features/allUsers/components/SearchedUsers';
import { MdClear } from 'react-icons/md';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Create Contest', to: '/create-contest' },
  { name: 'Join Contest', to: '/join-contest' },
  { name: 'Populars', to: '/popular-users' },
  { name: 'Your profile', to: '/profile' },
];

const Navbar = (props) => {
  const currentTheme = useSelector(selectTheme);
  const searchedUser = useSelector(selectSearchedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // console.log('logout');
    // console.log('logout');
    // <Navigate to='/login'/>
    dispatch(logoutUserAsync());
    dispatch(clearUserState());
    navigate('/login');
    console.log('cleared user');
  };
  const handleChange = (e) => {
    // console.log(e.target.value);
    dispatch(setSearchedUser(e.target.value));
  };
  const handleClear = () => {
    dispatch(clearSearchedUser());
  };
  return (
    <NavContainer>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <MidNav>
        <SearchBar>
          <SearchInput
            placeholder="Enter user's email"
            onChange={(e) => handleChange(e)}
            value={searchedUser === null ? '' : searchedUser}
          />
          <div className="icons-container">
            <MdClear className="clear-icon" size={25} onClick={handleClear} fill='red'/>
            <MdOutlinePersonSearch className="icon" size={25} />
          </div>
          {searchedUser && searchedUser !== '' && <SearchedUsers />}
        </SearchBar>
        <RouteTags currentTheme={currentTheme}>
          {navigation.map((item, idx) => (
            <RouteTag key={idx}>
              <Link to={item.to} className="link">
                {item.name}
              </Link>
            </RouteTag>
          ))}
        </RouteTags>
      </MidNav>
      <IconWrapper className="icons">
        <Link to="/">
          <Logo2 src={logo} />
        </Link>
        <IoMdExit size={30} className="exit" onClick={handleLogout} />
        <ThemeToggler />
      </IconWrapper>
    </NavContainer>
  );
};

const MidNav = styled.div`
  /* background-color: aqua; */
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchBar = styled.div`
  width: 100%;
  /* margin: 0 auto; */
  position: relative;
  padding: 0.5rem;
  margin-left: -0.5rem;
  border-radius: 10px;
  border: 1px solid gray;
  .icons-container {
    position: absolute;
    top: 10px;
    right: 10px;
    .clear-icon {
      margin-right: 2px;
      &:hover {
        cursor: pointer;
      }
    }
    .icon {
      margin-left: 2px;
    }
  }
  @media (max-width: 430px) {
    width: 80%;
    margin: 0 auto;
    padding: 0.3rem;
    /* margin-left: 0; */
    .icons-container {
      top: 10px;
      right: 8px;
      .clear-icon {
        width: 20px;
        height: auto;
        /* size: 12px; */
        
      }
      .icon {
        width: 20px;
        height: auto;
      }
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .exit {
    cursor: pointer;
  }
  @media (max-width:430px)
  {
    .exit{
      width: 25px;
    }
  }
`;

const NavContainer = styled.div`
  padding: 1rem 0;
  /* max-width: 80vw; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1050px) {
    font-size: 14px;
  }
  @media (max-width: 750px) {
    flex-direction: column-reverse;
    gap: 1rem;
    font-size: 14px;
  }
  @media (max-width:430px)
  {
    font-size: 13px;
  }
`;

const Logo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 750px) {
    display: none;
  }
  `;
const Logo2 = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  @media (max-width: 750px) {
    display: block;
  }
  @media (max-width: 430px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const RouteTags = styled.ul`
  display: flex;
  gap: 1rem;
  font-size: 13px;
  /* background-color: red; */
  padding: 1rem;
  box-shadow: ${(props) => props.theme[props.currentTheme].border};
  border-radius: 1rem;
  @media (max-width: 430px) {
    text-align: center;
  }
`;
const RouteTag = styled.li`
  text-decoration: none;
  list-style: none;
  .link {
    text-decoration: none;
    padding-bottom: 1px;
    &:hover {
      border-bottom: 1px solid lightgreen;
    }
  }
`;

export default Navbar;
