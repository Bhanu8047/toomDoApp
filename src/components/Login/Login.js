import React, {useState, useRef, useReducer, useEffect, useContext} from 'react';

import classes from './Login.module.css'
import Card from '../UI/Card/Card'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const usernameReducer = (state, action) => {
    if(action.type === 'INPUT_USERNAME'){
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if(action.type === 'INPUT_FOCUS'){
        return { value: state.value, isValid: state.value.length > 0 }
    }
    return { value: '', isValid: false }
}

const Login = props => {

    const ctx = useContext(AuthContext)

    const [username, dispatchUsername] = useReducer(usernameReducer, {
        value: '',
        isValid: null
    })
    const [password, setPassword] = useState('')
    const [isFormvalid, setIsFormValid] = useState('')

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const usernameHandler = (event) => {
        dispatchUsername({ type: 'INPUT_USERNAME', value: event.target.value })
    }
    const usernameValidator = (event) => {
        dispatchUsername({type: 'INPUT_FOCUS'})
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        const checker = setTimeout(()=> {
            setIsFormValid(username.isValid)
        })
        return () => {
            clearTimeout(checker)
        }
    }, [username.isValid]);

    const formHandler = (event)=> {
        event.preventDefault()
        if(isFormvalid){
            ctx.onLogin({ username: username.value, password })
            dispatchUsername({ type: 'INPUT_USERNAME', value: '' })
            setPassword('')
            usernameRef.current.clear()
            passwordRef.current.clear()
        } else {
            usernameRef.current.focus()
        }
    }
    return (
        <Card className={classes.cardWidth}>
            <form onSubmit={formHandler}> 
                <Input
                    type = 'text'
                    id = 'username'
                    label = 'Username'
                    ref={usernameRef}
                    value={username.value}
                    onChange={usernameHandler}
                    onBlur={usernameValidator}
                    isValid={username.isValid}
                />
                <Input
                    type='password'
                    id='password'
                    label ='Password'
                    ref={passwordRef}
                    value={password}
                    onChange={passwordHandler}
                />
                <div className={classes.form__group}>
                    <Button className={classes.button} type='submit'>login</Button>
                </div>
            </form>
        </Card>
    );
};

export default Login