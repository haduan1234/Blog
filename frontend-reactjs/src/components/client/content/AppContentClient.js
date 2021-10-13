import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from "../../../Client.routes"

const AppContentClient = () => {
    return (
            <div>
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) => (
                                        <>
                                            <route.component {...props} />
                                        </>
                                    )}
                                />
                            )
                        )
                    })}
                    {/* <Redirect from="/home" to="home/client" /> */}
                </Switch>
            </div>
    )
}

export default React.memo(AppContentClient)
