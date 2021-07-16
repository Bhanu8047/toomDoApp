import React, { useState, useEffect, useCallback, useMemo } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {},
    onSignup: () => {},
    message: '',
    error: '',
    tasks: [],
})

const loginHeaders = {
    'Content-Type' : 'application/json'
}
const baseUrl = 'http://localhost:5000/api'

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [resMessage, setResMessage] = useState('')
    const [resError, setResError] = useState('')
    const [tasks, setTasks] = useState([])
    const [token, setToken] = useState('')
    
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
    const loginHandler = async (data) => {
        const res = await fetch(baseUrl+'/user/login', { method: 'POST', headers: loginHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            setIsLoggedIn(true)
            setToken(resData.token)
            localStorage.setItem('authToken', resData.token)
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }
    
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            setToken(localStorage.getItem('authToken'))
            setIsLoggedIn(true)
        }
    },[])

    const authHeaders = useMemo(()=>{
        return {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer '+ token,
            'driverapp': 'react_app'
        }
    },[token])
    
    
    const getTasks = useCallback(async () => {
        if(token){
            const res = await fetch(baseUrl+'/tasks', { method: 'GET', headers: authHeaders })
            const resData = await res.json()
            if(resData.success){
                setTasks(resData.tasks)
            }else if(resData.error){
                setResError(resData.error)
            }
        }
    }, [token, authHeaders])
    
    useEffect(()=>{
        getTasks()
    },[getTasks])
    
    const logoutHandler = async () => {
            const res = await fetch(baseUrl+'/user/logout', { method: 'POST', headers: authHeaders })
            const resData = await res.json()
            if(resData.success){
                setIsLoggedIn(false)
                setResMessage(resData.message)
                localStorage.removeItem('authToken')
            }else if(resData.error){
                setResError(resData.error)
            }
    }
    
    useEffect(() => {
        const resClear = setTimeout(()=>{
            setResMessage('')
            setResError('')
        }, 2000)
        return () => {
            clearTimeout(resClear)
        }
    }, [resMessage, resError])


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            onSignup: signupHandler,
            message: resMessage,
            error: resError,
            tasks: tasks
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext