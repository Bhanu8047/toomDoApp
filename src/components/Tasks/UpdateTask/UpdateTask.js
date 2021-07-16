import React, { Fragment, useContext, useState } from 'react'
import ReactDom from 'react-dom'

import classes from './UpdateTask.module.css'
import Card from "../../UI/Card/Card"
import Button from '../../UI/Button/Button'
import Input from "../../UI/Input/Input"
import AuthContext from '../../../store/auth-context'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = props => {
    const ctx = useContext(AuthContext)
    const [taskname, setTaskname] = useState(props.task.taskname)
    const [description, setDescription] = useState(props.task.description)
    const [deadline, setDeadline] = useState(props.task.deadline.substr(0,10))
    const [priority, setPriority] = useState(props.task.priority)

    const formHandler = (event) => {
        event.preventDefault()
        ctx.onUpdateTask({
           params: {
               taskname,
               description,
               deadline,
               priority
           },
           key: props.task._id
        })
        props.onConfirm()
    }
    return (
        <Card className={`${classes.cardWidth} ${classes.modal}`}>
            <form onSubmit={formHandler}>
                <Input
                    type='text'
                    label='Task Name'
                    id='taskname'
                    name='taskname'
                    value={taskname}
                    required
                    onChange={e=>{setTaskname(e.target.value)}}
                />
                <Input
                    type='text'
                    label='Description'
                    id='description'
                    name='description'
                    value={description}
                    required
                    onChange={e=>{setDescription(e.target.value)}}
                />
                <Input
                    type='date'
                    label='Deadline'
                    id='deadline'
                    name='deadline'
                    value={deadline}
                    required
                    onChange={e=>{setDeadline(e.target.value)}}
                />
                <div className={`${classes.form__group} ${classes.stretch} ${classes.direction}`}>
                    <label htmlFor='priority'>Priority</label>
                    <select id='priority' name='priority' value={priority} onChange={e=>{setPriority(e.target.value)}}>
                        <option value="high">high</option>
                        <option value="normal">normal</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div className={classes.form__group}>
                    <Button className={classes.button}>UPDATE TASK</Button>
                </div>
            </form>
        </Card>
    )
}

const UpdateTask = props => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onConfirm = {props.onConfirm} />, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay task={props.task} onConfirm = {props.onConfirm} />, document.getElementById('overlay-root'))}
        </Fragment>
    )
}

export default UpdateTask