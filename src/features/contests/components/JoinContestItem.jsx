import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { selectTheme } from '../../theme/themeSlice';
import { GiBattleAxe } from 'react-icons/gi';
import { Button1 } from '../../../styled-components/buttons/Button';
import { Input1 } from '../../../styled-components/inputs/Input';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { joinContestAsync } from '../contestSlice';
import { ImEnter } from 'react-icons/im';
import { BiSolidDoorOpen } from 'react-icons/bi';
import { CgBoy } from 'react-icons/cg';

const JoinContestItem = ({ contest }) => {
  const currentTheme = useSelector(selectTheme);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const onSubmit = async (data) => {
    // Handle login logic here
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(loginUserAsync(data));
    // let contestFormData = new FormData();
    // contestFormData.append('duration', data.duration);
    // contestFormData.append('file', data.file[0]);
    // await dispatch(createContestAsync(contestFormData));
    // dispatch(fetchUserInfoAsync())
    let joinFormData = new FormData();
    joinFormData.append('file', data.file[0]);
    const passedFormData = { data: joinFormData, contestId: contest._id };
    await dispatch(joinContestAsync(passedFormData));
    // reset()
    console.log('submiting', joinFormData);
  };

  const goToClickedUser = (userId) => {
    navigate(`/profile/user?id=${userId}`);
  };

  return (
    <JoinContestItemContainer currentTheme={currentTheme}>
      <UserAContainer currentTheme={currentTheme}>
        <Image src={contest.img1} alt="img1" />
        <ButtonContainer
          currentTheme={currentTheme}
          onClick={() => goToClickedUser(contest.user1)}
        >
          <CgBoy size={35} className="profile-icon" />
        </ButtonContainer>
      </UserAContainer>
      <Extras currentTheme={currentTheme}>
        <GiBattleAxe size={30} className="axe-icon" />
        <TimerContainer currentTheme={currentTheme}>
          <Heading4 currentTheme={currentTheme}>
            {' '}
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
        </TimerContainer>
      </Extras>
      <UserBContainer currentTheme={currentTheme}>
        <Form currentTheme={currentTheme} onSubmit={handleSubmit(onSubmit)}>
          <h4>Upload your Image</h4>
          <Input1
            currentTheme={currentTheme}
            type="file"
            id="file"
            {...register(`file`, {
              required: 'Picture is required!',
            })}
          />
          {errors.file && <p>{errors.file.message}</p>}
          <ButtonContainer currentTheme={currentTheme}>
            <button
              currentTheme={currentTheme}
              disabled={isSubmitting}
              className="join-btn"
              type="submit"
            >
              {isSubmitting ? (
                <ImEnter size={35} className="door-btn" />
              ) : (
                <BiSolidDoorOpen size={40} className="door-btn" />
              )}
            </button>
          </ButtonContainer>
        </Form>
      </UserBContainer>
    </JoinContestItemContainer>
  );
};

const ButtonContainer = styled.div`
  /* border-radius: 100%; */
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  .profile-icon {
    background-color: lightblue;
    border-radius: 100%;
    cursor: pointer;
    padding: 2px;
  }
  .door-btn {
    fill: #06779c;
    padding: 2px;
    background-color: lightskyblue;
    border-radius: 100%;
  }
  .join-btn {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    border: none;
    cursor: pointer;
  }
  &:hover {
    scale: 104%;
  }
`;

const Form = styled.form`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  h4 {
    text-align: center;
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
  }
  p {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    text-align: center;
    color: red;
  }
`;

const JoinContestItemContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  /* gap: 1rem; */
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
  font-size: 10px;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  .time-icon {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    transform-origin: 50% 50%; // Set the transform-origin to the center
    animation: ${rotateClockwise} 5s linear infinite;
  }
`;

const Heading4 = styled.h4`
  color: gray;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
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
  justify-content: center;
  gap: 1rem;
`;

const UserBContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Extras = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .axe-icon {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
  }
`;
export default JoinContestItem;
