import styles from "./addTask.module.css";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PropagateLoader } from "react-spinners"; // Import the spinner
import { useAuth } from "../../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
const navigate = useNavigate();
const { addTask } = useOutletContext();
const { register, handleSubmit, setValue  } = useForm();
const [loading, setLoading] = useState(false); // Loading state
const {users, role} = useAuth();
const [selectedUsers, setSelectedUsers] = useState([]);



const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            selectedValues.push(options[i].value);
        }
    }
    setSelectedUsers(selectedValues);
    setValue("assignTo", selectedValues); // Update form value
};


    if (role === "user") {
        navigate('/management');
    };



const onSubmit = async (data) => {
    setLoading(true); // Start loading

    // Minimum loading time of 2 seconds
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('status', data.status);
    formData.append('deadline', data.deadline);
    
     data.assignTo.forEach((assignee) => {
        if (assignee) {
            formData.append('assignee[]', assignee);
        }
    });

    const addTaskResult = addTask(formData);

    // Wait for both the minimum loading time and the actual add user result
    await Promise.all([minLoadingTime, addTaskResult]);
    setLoading(false); 
    navigate('/management/tasks');
}

if (loading) {
    return <div className={styles.loading}><PropagateLoader color="#7e3f9d" size={20} /></div>;
}


return (
    <div className={styles.addTaskContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <Link to="/management/tasks" className={styles.backButton}>
                Back
            </Link>
            <label className={styles.label}>
                Title
                <input className={styles.input}
                defaultValue={"New Task"}
                    type="text"
                    {...register("title")}
                />
            </label>
            <label className={styles.label}>
                Description
                <input className={styles.input}
                    defaultValue={"New Task Description"}
                    type="text"
                    {...register("description")}
                />
            </label>
            <label className={styles.label}>
                Status
                <select {...register("status")}
                >
                    <option value="open">Open</option>
                    <option value="assigned">Assigned</option>
                    <option value="progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select> 
            </label>
            <label className={styles.label}>
                Deadline
                <input className={styles.input}
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    {...register("deadline")}
                />
            </label>
            <label className={styles.label}>
                    Assign to
                    <div className={styles.selectedUsersContainer}>
        {selectedUsers.length === 0
            ? <span>No users selected</span>
            : selectedUsers.map((userId, index) => (
                <span key={userId} className={styles.selectedUser}>
                    {users.find(user => user._id === userId)?.name}
                    {index < selectedUsers.length - 1 && ', '}
                </span>
            ))
        }
    </div>

                   
                    <select multiple onChange={handleSelectChange}>
                        <option value="">Open to Assign</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </label>

            <button className={styles.submitButton} type="submit">Add Task</button>
        </form>
    </div>
)
}


export default AddTask;