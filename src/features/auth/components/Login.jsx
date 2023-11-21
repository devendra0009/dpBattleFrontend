// Install required packages
// npm install react react-dom react-hook-form

// Login.js
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Form } from '../../../styled-components/forms/Form';
import { Container } from '../../../styled-components/container/Container';
import { Button1 } from '../../../styled-components/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { Input1 } from '../../../styled-components/inputs/Input';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';

const Login = () => {
  const [showP, setShowP] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();
  const currentTheme = useSelector(selectTheme);
  const dispatch=useDispatch();

  const onSubmit = async (data) => {
    // Handle login logic here
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(loginUserAsync(data));
    console.log('submiting');
  };
  return (
    <Container>
      <Form currentTheme={currentTheme} onSubmit={handleSubmit(onSubmit)}>
        <InputContainer className="email" currentTheme={currentTheme}>
          Email
          <div>
            <Input1 currentTheme={currentTheme}
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid Email',
                },
              })}
            />
          </div>
          {errors.email && <p>{errors.email.message}</p>}
        </InputContainer>
        <InputContainer currentTheme={currentTheme} className="password">
          Password
          <PasswordContainer>
            <Input1 currentTheme={currentTheme}
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

        <Button1 currentTheme={currentTheme} disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button1>
        <Link className="link" to='/register'>Register</Link>
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

export default Login;



