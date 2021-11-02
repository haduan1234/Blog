import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import AppHeaderClient from "../components/client/AppHeaderClient"
import AppContentClient from 'src/components/client/content/AppContentClient'
import AppFoorterClient from 'src/components/client/AppFooterClient'




const UserDefaultLayout = () => {
    return (
        < Provider store={store} >
        <div className="d-flex align-items-start  flex-column bd-highlight mb-3 cssApp_content" >
            <div className=" bd-highlight" >
                <AppHeaderClient />
            </div>
            <div className=" bd-highlight pt-5">
                <AppContentClient />
            </div>
            <div className="mt-auto  bd-highlight">
                <AppFoorterClient />
            </div>
        </div>
        </Provider>
    )
}

export default UserDefaultLayout