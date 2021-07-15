import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef(null)
    const activate = () => {
        inputRef.current.focus()
    }
    const clear = () => {
        inputRef.current.value = ''
    }
    useImperativeHandle(ref, () => {
        return {
            focus: activate,
            clear: clear
        }
    })
    return (
        <div className={`${classes.input} ${
            props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type = {props.type}
                id = {props.id}
                value = {props.value}
                onChange = {props.onChange}
                onBlur = {props.onBlur}
                placeholder={props.label}
                required={props.required}
            />
        </div>
    )
})

export default Input