import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoutes = props => {
    const { component: Component, redirectTo, path, token } = props
    return (
        token
            ?   <Route exact path={path} component={Component}/> // protected route component...
            :   <Redirect to={redirectTo}/>
    )
}

export default ProtectedRoutes