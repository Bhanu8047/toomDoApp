import React from "react"

import Tasks from '../Tasks/Tasks'
import AddTask from "../Tasks/AddTask/AddTask"

const Home = () => {
    return (
        <React.Fragment>
            <AddTask />
            <Tasks />
        </React.Fragment>
    )
}


export default Home