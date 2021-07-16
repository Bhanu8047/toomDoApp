import React, {useState, useRef, useContext} from 'react';
import Card from '../UI/Card/Card';

import classes from './Signup.module.css'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'

const Signup = props => {

    const ctx = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const nameHandler = (event) => {
        setName(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const formHandler = (event) => {
        event.preventDefault()
        // console.log(email, username, name, password)
        ctx.onSignup({email, username, name, password})
        // usernameRef.current.clear()
        // emailRef.current.clear()
        // passwordRef.current.clear()
        // nameRef.current.clear()
    }
    return(
        <Card className={classes.cardWidth}>
            <form onSubmit={formHandler}>
                <Input
                    type = 'text'
                    id = 'name'
                    label = 'Name'
                    ref={nameRef}
                    value={name}
                    onChange={nameHandler}
                    required={true}
                />
                <Input
                    type = 'text'
                    id = 'username'
                    label = 'Username'
                    ref={usernameRef}
                    value={username}
                    onChange={usernameHandler}
                    required={true}
                />
                <Input
                    type = 'email'
                    id = 'email'
                    label = 'E-Mail'
                    ref={emailRef}
                    value={email}
                    onChange={emailHandler}
                    required={true}
                />
                <Input
                    type = 'password'
                    id = 'password'
                    label = 'Password'
                    ref={passwordRef}
                    value={password}
                    onChange={passwordHandler}
                    required={true}
                />
                <div className={`${classes.form__group} ${classes.alignCenter}`}>
                    <em className={!ctx.message.length > 0 ? classes.errorMessage : classes.message} >{ctx.message.length > 0 ? ctx.message : ctx.error}</em>
                </div>
                <div className={classes.form__group}>
                    <Button type='submit' className={classes.button}>signup</Button>
                </div>
            </form>
        </Card>
    );
}

export default Signup