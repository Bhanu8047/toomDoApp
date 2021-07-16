import React, { Fragment, useContext, useState } from 'react'

import classes from './TaskItem.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'
import UpdateTask from './UpdateTask/UpdateTask'

const TaskItem = props => {

    const ctx = useContext(AuthContext)
    const [modal, setModal] = useState(false)

    const modalHandler = () => {
        setModal(!modal)
    }

    const deleteHandler = () => {
        ctx.onDeleteTask({key: props.task._id})
    }

    const completeHandler = () => {
        ctx.onCompletedTask({key: props.task._id})
    }
    const pendingHandler = () => {
        ctx.onPendingTask({key: props.task._id})
    }
    return(
        <Fragment>
            {modal && <UpdateTask task={props.task} onConfirm={modalHandler} />}
            <Card className={classes.task}>
                    <h4 className={classes.heading}>{props.task.taskname} 
                    <span className={props.task.completed ? classes.completed : classes.pending}>{props.task.completed ? 'completed': 'pending'}</span>
                    </h4>
                    <p><strong>Description: </strong>{props.task.description}</p>
                    <p><strong>Priority: </strong>{props.task.priority}</p>
                    <p><strong><em>Deadline: </em></strong>{props.task.deadline.substr(0,10)}</p>
                    <div className={classes.group}>
                        {!props.task.completed && <Button onClick={completeHandler} className={`${classes.button} ${classes.complete}`}>MARK COMPLETED</Button>}
                        {props.task.completed && <Button onClick={pendingHandler} className={`${classes.button} ${classes.complete}`}>MARK PENDING</Button>}
                        {!props.task.completed && <Button onClick={modalHandler} className={`${classes.button} ${classes.update}`}>UPDATE</Button>}
                        <Button onClick={deleteHandler} className={`${classes.button} ${classes.delete}`}>DELETE</Button>
                    </div>
            </Card>
        </Fragment>
    )
}

export default TaskItem