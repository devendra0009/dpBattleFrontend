import React from 'react'
import MainLayout from '../layout/MainLayout'
import Profile from '../features/user/components/Profile'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../features/user/userSlice';

const ProfilePage = () => {
  const user = useSelector(selectUserInfo);
  return (
    <MainLayout>
        <Profile user={user} width='150px' height='150px' containerWidth='60%' containerWidth2='80%' containerWidth3='90%'  flexDirection={'row'} />
    </MainLayout>
  )
}

export default ProfilePage