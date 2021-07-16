import React, { useContext, useRef } from 'react'

import classes from './AddTask.module.css'
import Card from '../../UI/Card/Card'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import AuthContext from '../../../store/auth-context'

const AddTask = props => {

    // const [taskname, setTaskname] = useState('')
    // const [description, setDescription] = useState('')
    // const [priority, setPriority] = useState('')
    // const [deadline, setDeadline] = useState('')
    const ctx = useContext(AuthContext)

    const tasknameRef = useRef(null)
    const descriptionRef = useRef(null)
    const priorityRef = useRef(null)
    const deadlineRef = useRef(null)

    const formHandler = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            taskname: formData.get('taskname'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            deadline: formData.get('deadline')
        }
        ctx.onAddTask(data)
    }
    return (
        <Card className={classes.cardWidth}>
            <form onSubmit={formHandler}>
                <Input
                    type='text'
                    label='Task Name'
                    id='taskname'
                    ref={tasknameRef}
                    name='taskname'
                    required
                />
                <Input
                    type='text'
                    label='Description'
                    id='description'
                    ref={descriptionRef}
                    name='description'
                    required
                />
                <Input
                    type='date'
                    label='Deadline'
                    id='deadline'
                    ref={deadlineRef}
                    name='deadline'
                    required
                />
                <div className={`${classes.form__group} ${classes.stretch} ${classes.direction}`}>
                    <label htmlFor='priority'>Priority</label>
                    <select id='priority' name='priority' ref={priorityRef}>
                        <option value="normal" defaultValue>normal</option>
                        <option value="high">high</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div className={`${classes.form__group} ${classes.alignCenter}`}>
                    <em className={!ctx.message.length > 0 ? classes.errorMessage : classes.message} >{ctx.message.length > 0 ? ctx.message : ctx.error}</em>
                </div>
                <div className={classes.form__group}>
                    <Button className={classes.button}>ADD TASK</Button>
                </div>
            </form>
        </Card>
    )
}

export default AddTask