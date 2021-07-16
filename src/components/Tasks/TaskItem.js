import React, { useContext } from 'react'

import classes from './TaskItem.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'

const TaskItem = props => {

    const ctx = useContext(AuthContext)

    const deleteHandler = () => {
        ctx.onDeleteTask({key: props.task._id})
    }
    return(
        <Card className={classes.task}>
                <h4 className={classes.heading}>{props.task.taskname} <span className={props.task.completed ? classes.completed : classes.pending}>{props.task.completed ? 'completed': 'pemding'}</span></h4>
                <p><strong>Description: </strong>{props.task.description}</p>
                <p><strong>Priority: </strong>{props.task.priority}</p>
                <p><strong><em>Deadline: </em></strong>{props.task.deadline.substr(0,10)}</p>
                <Button onClick={deleteHandler} className={classes.button}>DELETE</Button>
        </Card>
    )
}

export default TaskItem