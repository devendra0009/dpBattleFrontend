import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { Form } from '../../../styled-components/forms/Form';
import { Container } from '../../../styled-components/container/Container';
import styled from 'styled-components';
import { Input1 } from '../../../styled-components/inputs/Input';
import { Button1 } from '../../../styled-components/buttons/Button';
import { Link } from 'react-router-dom';
import { registerUserAsync } from '../authSlice';

const Register = () => {
  const [showP, setShowP] = useState(false);
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const currentTheme = useSelector(selectTheme);

  const onSubmit = async (data) => {
    // Handle login logic here
    let userData = new FormData();
    userData.append('name', data.name);
    userData.append('email', data.email);
    userData.append('password', data.password);
    // userData.append('role', data.role);
    userData.append('file', data.file[0]);
    console.log(userData);
    dispatch(registerUserAsync(userData));
    // console.log('submiting');
  };
  return (
    <Container>
      <Form currentTheme={currentTheme} onSubmit={handleSubmit(onSubmit)}>
        <InputContainer className="name" currentTheme={currentTheme}>
          Name
          <ExtraContainer>
            <Input1
              currentTheme={currentTheme}
              id="name"
              type="text"
              {...register('name', {
                required: 'Name is required',
              })}
            />
          </ExtraContainer>
          {errors.name && <p>{errors.name.message}</p>}
        </InputContainer>
        <InputContainer className="email" currentTheme={currentTheme}>
          Email
          <ExtraContainer>
            <Input1
              currentTheme={currentTheme}
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid Email',
                },
              })}
            />
          </ExtraContainer>
          {errors.email && <p>{errors.email.message}</p>}
        </InputContainer>
        <InputContainer currentTheme={currentTheme} className="password">
          Password
          <PasswordContainer>
            <Input1
              currentTheme={currentTheme}
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    'Must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number.',
                },
              })}
              type={showP ? 'text' : 'password'}
            />
            {!showP ? (
              <AiFillEyeInvisible
                className="icon"
                size={25}
                onClick={() => setShowP(!showP)}
              />
            ) : (
              <AiFillEye
                className="icon"
                size={25}
                onClick={() => setShowP(!showP)}
              />
            )}
          </PasswordContainer>
          {errors.password && <p>{errors.password.message}</p>}
        </InputContainer>
        <InputContainer currentTheme={currentTheme} className="confirmPassword">
          Confirm Password
          <PasswordContainer>
            <Input1
              currentTheme={currentTheme}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confrim Password is required',
                validate: (val, formVal) =>
                  val === formVal.password || 'Password not Matching',
              })}
              type={showP ? 'text' : 'password'}
            />
            {!showP ? (
              <AiFillEyeInvisible
                className="icon"
                size={25}
                onClick={() => setShowP(!showP)}
              />
            ) : (
              <AiFillEye
                className="icon"
                size={25}
                onClick={() => setShowP(!showP)}
              />
            )}
          </PasswordContainer>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </InputContainer>
        <InputContainer currentTheme={currentTheme} className="profilepic">
          Profile Pic
          <ExtraContainer>
            <Input1
              currentTheme={currentTheme}
              type="file"
              id={`file`}
              {...register(`file`, {
                required: 'Profile picture is required',
              })}
            />
          </ExtraContainer>
          {errors.file && <p>{errors.file.message}</p>}
        </InputContainer>

        <Button1
          currentTheme={currentTheme}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button1>
        <Link className="link" to="/login">
          Login
        </Link>
      </Form>
    </Container>
  );
};
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme[props.currentTheme].bg2}; // dynamic color
  gap: 0.5rem;
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  position: relative;
  border-radius: 10px;
  .icon {
    position: absolute;
    right: 10px;
  }
`;
const ExtraContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  position: relative;
  border-radius: 10px;
  .icon {
    position: absolute;
    right: 10px;
  }
`;

export default Register;
