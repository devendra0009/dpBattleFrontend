import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button1 } from '../../../styled-components/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { GiBattleAxe } from 'react-icons/gi';
import { WiTime12 } from 'react-icons/wi';
import { MdExposurePlus1 } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { CgBoy } from 'react-icons/cg';
import { updateContestAsync } from '../contestSlice';
import { useNavigate } from 'react-router-dom';
import { BiSolidCrown } from 'react-icons/bi';
import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';

const ContestComponent = ({ contest, i, setCurrentPage }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector(selectTheme);
  const dateString = contest.createdAt;
  const dateObject = new Date(dateString);
  // Extract date components
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are zero-based
  const day = dateObject.getDate();

  // Extract time components
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`;

  const handleVoteClick1 = async () => {
    const data = {
      contestId: contest._id,
      winnerUser: 'one',
    };
    setIsButtonDisabled(true);
    dispatch(updateContestAsync(data));
    const btnAnimated = (document.getElementById(
      `countAnimation${i}1`
    ).style.display = 'block');
    setTimeout(() => {
      const btnAnimated = (document.getElementById(
        `countAnimation${i}1`
      ).style.display = 'none');
      setIsButtonDisabled(false);
    }, 1000);
  };
  const handleVoteClick2 = () => {
    const data = {
      contestId: contest._id,
      winnerUser: 'two',
    };
    setIsButtonDisabled(true);
    dispatch(updateContestAsync(data));
    const btnAnimated = (document.getElementById(
      `countAnimation${i}2`
    ).style.display = 'block');
    setTimeout(() => {
      const btnAnimated = (document.getElementById(
        `countAnimation${i}2`
      ).style.display = 'none');
      setIsButtonDisabled(false);
    }, 1000);
  };

  const goToClickedUser = (userId) => {
    navigate(`/profile/user?id=${userId}`);
  };

  return (
    <ContestComponentContainer currentTheme={currentTheme} >
      {/* divide this container into two parts */}
      <UserAContainer currentTheme={currentTheme}>
        {contest.status === 'fighting' &&
          (contest.votesU1 >= contest.votesU2 ? (
            <BiSolidUpvote size={40} fill="#4169E1" className='vote-icon' />
          ) : (
            <BiSolidDownvote size={40} fill="#4169E1" className='vote-icon'/>
          ))}
        {contest.status === 'closed' && contest.votesU1 >= contest.votesU2 && (
          <BiSolidCrown
            size={40}
            fill="orange"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '100%',
              background: 'black',
              padding: '0.3rem',
            }}
          />
        )}

        <Image src={contest.img1} alt="img1" className="img" />
        {contest.status === 'fighting' && (
          <ButtonContainer1 isButtonDisabled={isButtonDisabled} i={i}>
            <MdExposurePlus1 id={`countAnimation${i}1`} size={20} />
            <button
              className="vote-btn1"
              currentTheme={currentTheme}
              onClick={handleVoteClick1}
              disabled={isButtonDisabled}
            >
              <AiFillLike
                size={30}
                className="vote-icon1"
                isButtonDisabled={isButtonDisabled}
              />
            </button>
            <CgBoy
              size={30}
              className="profile-icon1"
              onClick={() => goToClickedUser(contest.user1)}
            />
            {contest.votesU1}
          </ButtonContainer1>
        )}
      </UserAContainer>
      <Extras currentTheme={currentTheme}>
        <GiBattleAxe size={30} className="axe-icon" />
        <TimerContainer currentTheme={currentTheme}>
          {(contest.status === 'fighting' || contest.status === 'matching') && (
            <>
              {' '}
              <WiTime12
                size={20}
                className="time-icon"
                currentTheme={currentTheme}
              />
              <Heading4 currentTheme={currentTheme}>
                {' '}
                {/* Created at: {contest.status} */}
                Created at: {formattedDate}{' '}
              </Heading4>
              <Heading4 currentTheme={currentTheme}>
                {' '}
                Created on: {formattedTime}{' '}
              </Heading4>
              <Heading4 currentTheme={currentTheme}>
                {' '}
                Duration: {contest.duration}{' '}
              </Heading4>
            </>
          )}
        </TimerContainer>
      </Extras>
      <UserBContainer currentTheme={currentTheme}>
        {contest.status === 'fighting' &&
          (contest.votesU1 <= contest.votesU2 ? (
            <BiSolidUpvote size={40} fill="#FF474D" className='vote-icon'/>
          ) : (
            <BiSolidDownvote size={40} fill="#FF474D" className='vote-icon'/>
          ))}
        {contest.status === 'closed' && contest.votesU1 <= contest.votesU2 && (
          <BiSolidCrown
            size={40}
            fill="orange"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '100%',
              background: 'black',
              padding: '0.3rem',
            }}
          />
        )}

        <Image
          src={
            contest.img2 ||
            'https://freepngimg.com/convert-png/88500-text-awesome-question-mark-font-symbol'
          }
          alt="img2"
          className="img"
        />
        {contest.status === 'fighting' && (
          <ButtonContainer2 isButtonDisabled={isButtonDisabled} i={i}>
            <MdExposurePlus1 id={`countAnimation${i}2`} size={20} />
            <button
              className="vote-btn2"
              currentTheme={currentTheme}
              onClick={handleVoteClick2}
              disabled={isButtonDisabled}
            >
              <AiFillLike
                size={30}
                className="vote-icon2"
                isButtonDisabled={isButtonDisabled}
              />
            </button>
            <CgBoy
              size={30}
              className="profile-icon2"
              onClick={() => goToClickedUser(contest.user2)}
            />
            {contest.votesU2}
          </ButtonContainer2>
        )}
      </UserBContainer>
    </ContestComponentContainer>
  );
};




const moveUpFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px); /* Adjust as needed */
  }
`;

const ButtonContainer1 = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  position: relative;
  border-radius: 10px;
  #countAnimation${(props) => props.i}1 {
    display: none;
    position: absolute;
    left: 0.7rem;
    background-color: lightgreen;
    border-radius: 100%;
    padding: 2px;
    animation: ${moveUpFadeOut} 1s ease-in-out forwards;
  }
  .vote-icon1 {
    fill: ${(props) => (props.isButtonDisabled === true ? 'gray' : '#4169E1')};
  }
  .vote-btn1 {
    /* padding: 0.5rem 1rem; */
    border: none;
    font-weight: bold;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  .profile-icon1 {
    background-color: lightblue;
    border-radius: 105%;
    &:hover {
      scale: 105%;
      cursor: pointer;
    }
  }
`;
const ButtonContainer2 = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  position: relative;
  .profile-icon2 {
    background-color: #ffcccb;
    border-radius: 105%;
    &:hover {
      scale: 105%;
      cursor: pointer;
    }
  }
  #countAnimation${(props) => props.i}2 {
    display: none;
    position: absolute;
    left: 0.7rem;
    background-color: lightgreen;
    border-radius: 100%;
    padding: 2px;
    animation: ${moveUpFadeOut} 1s ease-in-out forwards;
  }
  .vote-icon2 {
    fill: ${(props) => (props.isButtonDisabled === true ? 'gray' : '#FF3131')};
  }
  .vote-btn2 {
    /* padding: 0.5rem 1rem; */
    border: none;
    font-weight: bold;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const rotateClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  .time-icon {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    transform-origin: 50% 50%; // Set the transform-origin to the center
    animation: ${rotateClockwise} 5s linear infinite;
    margin-bottom: 5px;
  }
`;

const Heading4 = styled.h5`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  color: gray;
`;

const ContestComponentContainer = styled.div`
  /* background-color: aquamarine; */
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  /* gap: 2rem; */
  @media (max-width: 1200px) {
    .img {
      width: 120px;
      height: 120px;
    }
  }
  @media (max-width: 750px) {
    .img {
      width: 80px;
      height: 80px;
    }
  }
  .vote-icon{
  background:transparent;
  
}
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 1px solid lightgray;
  padding: 5px;
`;
const UserAContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const UserBContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
`;
const Extras = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .axe-icon {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
  }
`;

export default ContestComponent;
