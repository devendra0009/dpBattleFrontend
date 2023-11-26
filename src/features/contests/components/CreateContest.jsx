import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FormTwo } from '../../../styled-components/forms/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { Input1 } from '../../../styled-components/inputs/Input';
import { Button1 } from '../../../styled-components/buttons/Button';
import {
  createContestAsync,
  createContestWithFriendAsync,
} from '../contestSlice';
import { fetchUserInfoAsync } from '../../user/userSlice';

const TabContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
  @media (max-width:750px)
  {
    width: 90%;
    margin: 0 auto;
  }
  `;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TabButton1 = styled.button`
  flex: 1;
  padding: 1rem;
  background-color:${(props)=>(props.isactive ?'lightgreen': props.theme[props.currentTheme].bg )} ;
  color: ${(props) =>  props.theme[props.currentTheme].text};
  border: none;
  border-radius: 10px 0 0px 10px;
  cursor: pointer;
  outline: none;
  @media (max-width:750px)
  {
    padding: 0.8rem;
  }
  @media (max-width:430px)
  {
    padding: 0.5rem;
  }
  `;
const TabButton2 = styled.button`
  flex: 1;
  padding: 1rem;
  background-color:${(props)=>(props.isactive ?'lightgreen': props.theme[props.currentTheme].bg )} ;
  color: ${(props) =>  props.theme[props.currentTheme].text};
  border: none;
  border-radius: 0 10px 10px 0px;
  cursor: pointer;
  outline: none;
  @media (max-width:750px)
  {
    padding: 0.8rem;
  }
  @media (max-width:430px)
  {
    padding: 0.5rem;
  }
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width:750px)
  {
    font-size: 14px;
  }
  @media (max-width:430px)
  {
    /* font-size: 14px; */
    
  }
`;
// const FormHeading = styled.h2``;

const ExtraContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Select = styled.select`
  padding: 0.7rem 0.8rem;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const Form1 = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const currentTheme = useSelector(selectTheme);

  const onSubmit = async (data) => {
    // Handle login logic here
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(loginUserAsync(data));
    let contestFormData = new FormData();
    contestFormData.append('duration', data.duration);
    contestFormData.append('file', data.file[0]);
    await dispatch(createContestAsync(contestFormData));
    dispatch(fetchUserInfoAsync());
    reset();
    // console.log('submiting', data, contestFormData);
  };

  return (
    <FormContainer currentTheme={currentTheme}>
      {/* <FormHeading>Form 1</FormHeading> */}
      <FormTwo currentTheme={currentTheme} onSubmit={handleSubmit(onSubmit)}>
        <ExtraContainer>
          <label htmlFor="file">Upload Your Image</label>
          <Input1
            currentTheme={currentTheme}
            type="file"
            id="file"
            {...register(`file`, {
              required: 'Picture is required!',
            })}
          />
          {errors.file && <p>{errors.file.message}</p>}
        </ExtraContainer>
        <ExtraContainer>
          <label htmlFor="duration">Select the Duration </label>
          <Select
            {...register('duration', {
              required: 'Duration is required!',
            })}
            // placeholder='Please Select a Duration'
            id="duration"
          >
            <option value="5m">5 minutes</option>
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
          </Select>
          {errors.duration && <p>{errors.duration.message}</p>}
        </ExtraContainer>
        <Button1
          currentTheme={currentTheme}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button1>
      </FormTwo>
    </FormContainer>
  );
};

const Form2 = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const currentTheme = useSelector(selectTheme);

  const onSubmit = async (data) => {
    // Handle login logic here
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // dispatch(loginUserAsync(data));
    let contestFormData = new FormData();
    contestFormData.append('user2Email', data.user2Email);
    data.files.forEach((file) => {
      contestFormData.append('files', file[0]);
    });
    contestFormData.append('duration', data.duration);
    await dispatch(createContestWithFriendAsync(contestFormData));
    dispatch(fetchUserInfoAsync());
    reset();
    console.log('submiting', contestFormData);
  };

  return (
    <FormContainer currentTheme={currentTheme}>
      {/* <FormHeading>Form 1</FormHeading> */}
      <FormTwo currentTheme={currentTheme} onSubmit={handleSubmit(onSubmit)}>
        <ExtraContainer>
          <Input1
            currentTheme={currentTheme}
            type="text"
            placeholder="Enter Friend's email"
            id="user2Email"
            {...register('user2Email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid Email',
              },
            })}
          />
          {errors.user2Email && <p>{errors.user2Email.message}</p>}
        </ExtraContainer>
        <ExtraContainer>
          {[1, 2].map((index) => (
            <div className="sm:col-span-2" key={index}>
              <label htmlFor={`file${index}`}>
                Upload {index === 1 ? 'Your' : "Friend's"} Image
              </label>
              <Input1
                currentTheme={currentTheme}
                type="file"
                id={`file${index}`}
                {...register(`files.${index - 1}`, {
                  required: `${
                    index === 1 ? 'Your' : "Friend's"
                  } image is required`,
                })}
              />
              {errors.files && errors.files[index - 1] && (
                <p>{errors.files[index - 1].message}</p>
              )}
            </div>
          ))}
        </ExtraContainer>
        <ExtraContainer>
          <label htmlFor="select">Select the Duration </label>
          <Select
            {...register('duration', {
              required: 'Duration is required!',
            })}
            // placeholder='Please Select a Duration'
            id="select"
          >
            <option value="5m">5 minutes</option>
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
          </Select>
          {errors.duration && <p>{errors.duration.message}</p>}
        </ExtraContainer>
        <Button1 currentTheme={currentTheme} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button1>
      </FormTwo>
    </FormContainer>
  );
};

const CreateContest = () => {
  const currentTheme=useSelector(selectTheme)
  const [activeTab, setActiveTab] = useState('form1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabContainer>
      <Tabs>
        <TabButton1
        currentTheme={currentTheme}
          onClick={() => handleTabClick('form1')}
          isactive={activeTab === 'form1'}
        >
          With Random
        </TabButton1>
        <TabButton2
        currentTheme={currentTheme}
          onClick={() => handleTabClick('form2')}
          isactive={activeTab === 'form2'}
        >
          With Friend
        </TabButton2>
      </Tabs>
      {activeTab === 'form1' ? <Form1 /> : <Form2 />}
    </TabContainer>
  );
};

export default CreateContest;
