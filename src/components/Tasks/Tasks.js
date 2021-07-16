import React, { useContext } from 'react'

import classes from './Tasks.module.css'
import AuthContext from '../../store/auth-context'
import TaskItem from './TaskItem'

const Tasks = props => {
    const ctx = useContext(AuthContext) 
    return (
        <div className={classes.tasks}>
            <h2>Tasks</h2>
            {ctx.tasks.length === 0 && <h6>Its Empty Here, Add Some Tasks.</h6>}
            {ctx.tasks.length > 0 && ctx.tasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
    )
}

export default Tasks