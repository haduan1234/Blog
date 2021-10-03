import React, { useEffect } from 'react'

import AppHeaderClient from "../components/client/AppHeaderClient"
import AppContentClient from 'src/components/client/AppContentClient'
import AppFoorterClient from 'src/components/client/AppFooterClient'

const UserDefaultLayout = () => {
    return (
        <div className="d-flex align-items-start  flex-column bd-highlight mb-3 cssApp_content" >
            <div className="mb-auto p-2 bd-highlight" >
                <AppHeaderClient />
            </div>
            <div className="p-2 bd-highlight">
                <AppContentClient />
            </div>
            <div className="p-2 bd-highlight">
                <AppFoorterClient />
            </div>
        </div>
    )
}

export default UserDefaultLayout