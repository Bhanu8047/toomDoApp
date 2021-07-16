import React, { useContext, useState } from 'react'

import classes from './Tasks.module.css'
import AuthContext from '../../store/auth-context'
import TaskItem from './TaskItem'
import Button from '../UI/Button/Button'

const Tasks = props => {
    const ctx = useContext(AuthContext)
    const [completedTask, setTasksToShow] = useState(false)
    return (    
        <div className={classes.tasks}>
            <div className={classes.header}>
                <span></span>
                <span><h2>Tasks</h2></span>
                <span><Button onClick={() => {setTasksToShow(prev => !prev)}} className={`${classes.button} ${classes.primary}`}>{completedTask ? 'Show Incomplete Tasks': ' Show Completed Tasks'}</Button></span>
            </div>
            { completedTask && ctx.completedTasks.length === 0 && <h6>Its Empty Here, Add Some Tasks.</h6>}
            { completedTask && ctx.completedTasks.length > 0 && ctx.completedTasks.map(task => <TaskItem key={task._id} task={task} />) }
            { !completedTask && ctx.inCompletedTasks.length === 0 && <h6>Its Empty Here, Add Some Tasks.</h6>}
            { !completedTask && ctx.inCompletedTasks.length > 0 && ctx.inCompletedTasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
    )
}

export default Tasks