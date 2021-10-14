import React from "react";
import ClientPostCategory from "./views/client/CilentPostCategorys";



const AppContentClientHomes = React.lazy(() => import('./views/client/AppContentClientHome'))
const ClientCategorys = React.lazy(() => import('./views/client/CilentPostCategorys'))
const ClientPosts = React.lazy(() => import('./views/client/CilentPost'))


const routers = [
    { path: '/home', name: 'Home',component: AppContentClientHomes, exact: true },
    { path: '/home/postCategory/:id', name: 'Category',component: ClientCategorys },
    { path: '/home/post/:id', name: 'ClientPost',component: ClientPosts, exact: true },
]

export default routers