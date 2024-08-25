import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useOutletContext, Outlet } from "react-router-dom";
import TasksBlockAdmin from "./tasksBlockExtended/tasksBlockAdmin";


const Tasks = () => {
const { role, tasks} = useOutletContext();
const navigate = useNavigate();
const { token, setTasks } = useAuth();



const addTask = async (formData) => {
    try {
        const response = await fetch('http://localhost:3042/task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
            body: formData

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.json();
        setTasks([...tasks, result.data]);

    }
    catch (error) {
        console.error('Failed to add task:', error);
    }
}


return (
    <div>
        {role === "admin" ? (
            <div>
                <TasksBlockAdmin />
                <Outlet context={{addTask, tasks, setTasks}}/>
            </div>
        ) : (
            <div> 
               OUTLET FOR USER
            </div>
        )}
    </div>
)


};

export default Tasks;