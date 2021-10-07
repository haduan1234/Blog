import React, { useEffect } from 'react'

import AppHeaderClient from "../components/client/AppHeaderClient"
import AppContentClient from 'src/components/client/content/AppContentClient'
import AppFoorterClient from 'src/components/client/AppFooterClient'

const UserDefaultLayout = () => {
    return (
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
    )
}

export default UserDefaultLayout