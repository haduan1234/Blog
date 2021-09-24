import React  from "react";

import { useHistory, Link } from "react-router-dom"

import { getUser } from "src/services/localStorageService";

const Auth = ({router}) => {
    const history = useHistory()
    let checklocalStorage = getUser()
    if(!checklocalStorage) {
        history.push("/login")
    }
    history.push({router})

}

export default Auth