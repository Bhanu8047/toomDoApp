import React, { useContext } from 'react'

import classes from './Tasks.module.css'
import AuthContext from '../../store/auth-context'
import TaskItem from './TaskItem'

const Tasks = props => {
    const ctx = useContext(AuthContext) 
    return (
        <div className={classes.tasks}>
            {ctx.tasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
    )
}

export default Tasks