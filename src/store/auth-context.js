import React, { useState, useEffect, useCallback, useMemo } from 'react'

const AuthContext = React.createContext({
    // SETTING CONTEXT STATES TOBE USED IN DIFFERENT COMPONENTS
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {},
    onSignup: () => {},
    onAddTask: () => {},
    onDeleteTask: () => {},
    onUpdateTask:() => {},
    onCompletedTask: () => {},
    onPendingTask: () => {},
    message: '',
    error: '',
    tasks: [],
    completedTasks: [],
    inCompletedTasks: []
})

const loginHeaders = {
    'Content-Type' : 'application/json'
}
const baseUrl = 'http://192.168.1.37:5000/api'

export const AuthContextProvider = props => {
    // SETTING STATES FOR AUTHS, USERS, TASKS, ERRORS, TOKENS USING USESTATE
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [resMessage, setResMessage] = useState('')
    const [resError, setResError] = useState('')
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [inCompletedTasks, setInCompletedTasks] = useState([])
    const [token, setToken] = useState('')
    
    // LOGIN AND SIGNUP ***************************
    // ADD A USER , POST REQUEST
    const signupHandler = async (data) => {
        try {
            const res = await fetch(baseUrl+'/user', { method: 'POST', headers: loginHeaders, body: JSON.stringify(data) })
            const resData = await res.json()
            if(resData.success){
                setResMessage(resData.message)
                console.log('login please')
            }else if(resData.error){
                setResError(resData.error)
            }
        } catch (error) {
            setResError('Something went wrong.')
        }
    }
    // LOGIN USER, POST REQUEST, ALSO SET AUTHENTICATION DETAILS.
    const loginHandler = async (data) => {
        try {
            // SENDING REQUESTS USING FETCH API
            const res = await fetch(baseUrl+'/user/login', { method: 'POST', headers: loginHeaders, body: JSON.stringify(data) })
            const resData = await res.json()
            if(resData.success){
                // RESPONSE DATA ALLOCATION
                setIsLoggedIn(true)
                setToken(resData.token)
                localStorage.setItem('authToken', resData.token)
                setResMessage(resData.message)
            }else if(resData.error){
                // ERROR HANDLING WITHIN SUCCESSFUL REQ's
                setResError(resData.error)
            }
        } catch (error) {
            // UNKNOWN ERROR HANDLING 
            setResError(error.message)
        }
    }
    // AUTHENTICATION CHECK AFTER EVERY REFRESH
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            setToken(localStorage.getItem('authToken'))
            setIsLoggedIn(true)
        }
    },[])
    // HEADERS FOR AUTHENTICATED ROUTES************

    // USING USE MEMO TO RE_RENDER ONLY WHEN 'TOKEN' STATE CHANGES.
    // BECAUSE IT USES TOKEN STATE, TOBE PUSHED WITH OUR REQUESTS.
    const authHeaders = useMemo(()=>{
        return {
            // SETTING JSON TYPE DATA FOR CORS
            'Content-Type' : 'application/json',
            // TOKEN ADDED WITH AUTHORIZATION HEADER FOR AUTHENTICATION
            'Authorization': 'Bearer '+ token,
            // APP VERSIONING USING HEADER[DRIVERAPP]
            'driverapp': 'react_app'
        }
        // USING TOKEN STATE FOR RE-EVALUATION AND RE-RENDERING OF THE COMPONENT AND DEPENDENCIES
    },[token])

    // ADD TASK API HANDLER, TO BE ASSIGNED TO 'onADDTASK CONTEXT STATE' ********************** START.
    const addTask = async (data) => {
        // FETCH API
        const res = await fetch(baseUrl+'/task', { method: 'POST', headers: authHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            setTasks(previousTasks => [...previousTasks, resData.task])
            setInCompletedTasks(previousTasks => [...previousTasks, resData.task])
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }
    // ADD TASK API HANDLER, TO BE ASSIGNED TO 'onADDTASK CONTEXT STATE' ********************** END.

    // DELETE TASK 
    const deleteTask = async (data) => {
        // FETCH API BHOSADIKE
        const res = await fetch(baseUrl+'/task', { method: 'DELETE', headers: authHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            setTasks(previousTasks => {
                return previousTasks.filter(task => task._id !== data.key)
            })
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }

    const updateTask = async (data) => {
        const res = await fetch(baseUrl+'/task', { method: 'PUT', headers: authHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            setTasks(previousTasks => {
                const index = previousTasks.findIndex(task => task._id === data.key)
                previousTasks[index] = resData.task
                return previousTasks
            })
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }

    const completeTask = async (data) => {
        const res = await fetch(baseUrl+'/task/completed', { method: 'PUT', headers: authHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            const index = tasks.findIndex(task => task._id === data.key)
            setTasks(previousTasks => {
                previousTasks[index].completed = !previousTasks[index].completed
                return previousTasks
            })
            setCompletedTasks(previousTasks => [...previousTasks, tasks[index]])
            setInCompletedTasks(previousTasks => {
                return previousTasks.filter(task => task._id !== data.key)
            })
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }

    const pendingTask = async (data) => {
        const res = await fetch(baseUrl+'/task/completed', { method: 'PUT', headers: authHeaders, body: JSON.stringify(data) })
        const resData = await res.json()
        if(resData.success){
            const index = tasks.findIndex(task => task._id === data.key)
            setTasks(previousTasks => {
                previousTasks[index].completed = !previousTasks[index].completed
                return previousTasks
            })
            setInCompletedTasks(previousTasks => [...previousTasks, tasks[index]])
            setCompletedTasks(previousTasks => previousTasks.filter(task => task._id !== data.key))
            setResMessage(resData.message)
        }else if(resData.error){
            setResError(resData.error)
        }
    }
    
    // RE-RENDERING OR RE_EVALUATING GETTASKS BY USING TOKEN AND AUTHHEADERS AS DEPENSENCY STATES
    const getTasks = useCallback(async () => {
        try {
            if(token){
                const res = await fetch(baseUrl+'/tasks', { method: 'GET', headers: authHeaders })
                const resData = await res.json()
                if(resData.success){
                    setTasks(resData.tasks)
                    const incompletedTasks = resData.tasks.filter(task => task.completed === false)
                    const completedTasksYo = resData.tasks.filter(task => task.completed === true )
                    setInCompletedTasks(incompletedTasks)
                    setCompletedTasks(completedTasksYo)
                }else if(resData.error){
                    setResError(resData.error)
                }
            }
        } catch (error) {
            setResError(error)
        }
        // DEPENDENCY AUTHHEADERS, TOKEN
        // WHEN DEPENDENCY STATE CHANGES REACT WILL RERUN THIS FUNCTION
    }, [token, authHeaders])
    
    // CALLING GETTASKS WHEN THE APP RERUNS AND TO AVOID CALL LOOP , THE ABOVE FUNCTION IS WRAPPED IN USECALLBACK
    // SO THE FUNCTION IS ONLY REEVALUATED WHEN THESE DEPENDENCY CHANGES
    useEffect(()=>{
        // CALLING FUNCTION WHEN APP RERUNS
        getTasks()
    },[getTasks])
    
    // LOGOUT POST API, REMOVING AUTHTOKEN FROM LOCALSTORAGE
    const logoutHandler = async () => {
        try {
            // POST REQUEST FETCH API
                const res = await fetch(baseUrl+'/user/logout', { method: 'POST', headers: authHeaders })
                const resData = await res.json()
                if(resData.success) {
                    setIsLoggedIn(false)
                    setResMessage(resData.message)
                    localStorage.removeItem('authToken')
                } else if(resData.error) {
                    setResError(resData.error)
                }
        } catch (error) {
            setResError(error)
        }
    }

    // ERROR HANDING USING CONTEXT *********************************. START
    useEffect(() => {
        const resClear = setTimeout(()=>{
            setResMessage('')
            setResError('')
        },1000)
        return () => {
            clearTimeout(resClear)
        }
    }, [resMessage, resError])
    // ERROR HANDING USING CONTEXT *********************************. START
                

    return (
        // CONTEXT RIDER && PROVIDER
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            onSignup: signupHandler,
            onAddTask: addTask,
            onDeleteTask: deleteTask,
            onUpdateTask: updateTask,
            onCompletedTask: completeTask,
            onPendingTask: pendingTask,
            message: resMessage,
            error: resError,
            tasks: tasks,
            completedTasks: completedTasks,
            inCompletedTasks: inCompletedTasks
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext