import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./tasksBlock.module.css";
import { useEffect } from "react";

const TasksBlock = () => {
    const { tasks, users } = useOutletContext();
    const navigate = useNavigate();

    const handleBlockClick = () => {
        navigate('/management/tasks');
    };

    const findAsignedTo = (id) => {
        const user = users.find(user => user._id === id);
        return user ? user.name : 'Not assigned';
    };
    
    return (
        <div className={`${styles.tasksBlock} ${styles.wide}`} onClick={handleBlockClick}>
            <h2>TASKS</h2>
            <table className={styles.tasksTable}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Assigned To</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.slice(0, 6).map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.deadline}</td>
                            <td>{findAsignedTo(task.assignee)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default TasksBlock;
