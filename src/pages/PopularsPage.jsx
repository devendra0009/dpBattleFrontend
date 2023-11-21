import React from 'react'
import MainLayout from '../layout/MainLayout'
import PopularUsersComponent from '../features/allUsers/components/PopularUsersComponent'

const PopularsPage = () => {
  return (
    <MainLayout>
    <PopularUsersComponent/>
    </MainLayout>
  )
}

export default PopularsPage