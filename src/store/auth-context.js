import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {},
    onSignup: () => {},
    message: '',
    error: ''
})

const authHeaders = {
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer '+ localStorage.getItem('authToken'),
    'driverApp': 'react_app'
}
const loginHeaders = {
    'Content-Type' : 'application/json'
}
const baseUrl = 'http://localhost:5000/api'

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [resMessage, setResMessage] = useState('')
    const [resError, setResError] = useState('')
    
    const loginHandler = async (data) => {
        const res = await fetch(baseUrl+'/user/login', { method: 'POST', headers: loginHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            localStorage.setItem('authToken', resData.token)
            setResMessage(resData.message)
            setIsLoggedIn(true)
        }else if(resData.error){
            setResError(resData.error)
        }
    }

    const signupHandler = async (data) => {
        const res = await fetch(baseUrl+'/user', { method: 'POST', headers: loginHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            setResMessage(resData.message)
            console.log('login please')
        }else if(resData.error){
            setResError(resData.error)
        }
    }
    const logoutHandler = async () => {
        const res = await fetch(baseUrl+'/user/logout', { method: 'POST', headers: authHeaders })
        const resData = await res.json()
        if(resData.success){
            localStorage.removeItem('authToken')
            setIsLoggedIn(false)
        }else if(resData.error){
            setResError(resData.error)
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        if(token){
            setIsLoggedIn(true)
        }
    },[isLoggedIn])

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            onSignup: signupHandler,
            message: resMessage,
            error: resError
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext