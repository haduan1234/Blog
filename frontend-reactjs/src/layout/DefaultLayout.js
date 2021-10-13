import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useHistory, Link } from "react-router-dom"

import { getUser } from 'src/services/localStorageService'

const DefaultLayout = () => {
  const user = getUser()
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push("/login")
    }else if(user.RoleName == 'user') {
       history.push("/home")
    }
  },[])
  // .hidden{
  //   display: none
  // }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 p-3">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
