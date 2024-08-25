import { useState, useEffect } from "react";
import styles from "./tasksBlockAdmin.module.css";
import { useAuth } from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";


const TasksBlockAdmin = () => {
    const { tasks, users } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    
    const getAssignedUserNames = (assignees) => {
        // Find brugernavne for de tildelte bruger-IDs
        return assignees
            .map(id => users.find(user => user._id === id))
            .filter(user => user) // Filter out undefined values
            .map(user => user.name)
            .join(', ');
    };

    useEffect(() => {
        // Simuleret ventetid på 2 sekunder
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Ryd timeren, hvis komponenten bliver afmonteret
        return () => clearTimeout(timer);
    }, []);

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    return (
        <div className={styles.tasksContainer}>
            <h1>TASKS ADMIN</h1>
            <div className={styles.searchTaskBar}>
                <input 
                    type="text"
                    placeholder="Search task"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Link to="/management/tasks/add" className={styles.tasksAddBtn}><MdFormatListBulletedAdd /></Link>  
        
            <div className={styles.tasks}>
                {filteredTasks.map(task => (
                <div key={task._id} className={styles.task}>
                    <div className={styles.taskInfo}>
                        <div><h3>{task.title}</h3></div>
                        <div><p>{task.description}</p></div>
                        <div><p>{task.status}</p></div>
                        <div><p>{formatDate(task.deadline)}</p></div>
                        <div className={styles.assignedUsers}>
                <p>Assigned to: {getAssignedUserNames(task.assignee) || 'Not Assigned'}</p>
            </div>
                        
                       
                    </div>
                    <div className={styles.taskActions}>
                        <Link className={styles.actionsLink} to={`/management/tasks/edit/${task._id}`}>Edit</Link>
                        <Link className={styles.actionsLink} to={`/management/tasks/delete/${task._id}`}>Delete</Link>
                    </div>
                </div>
                ))    
                }
            </div>
        </div>
    )
};

export default TasksBlockAdmin;