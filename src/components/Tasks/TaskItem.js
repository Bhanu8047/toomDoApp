import React from 'react'

import classes from './TaskItem.module.css'
import Card from '../UI/Card/Card'

const TaskItem = props => {
    return(
        <Card className={classes.task}>
                <p>{props.task.taskname}</p>
                <p>{props.task.description}</p>
                <p>{props.task.priority}</p>
                <p>{props.task.completed ? 'completed': 'pemding'}</p>
                <p>{props.task.deadline.substr(0,10)}</p>
        </Card>
    )
}

export default TaskItem