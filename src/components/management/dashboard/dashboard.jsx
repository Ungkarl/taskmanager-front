import styles from "./dashboard.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import UsersBlock from "./blocks/usersBlock/usersBlock";
import SkeletonLoader from "../../skeletonLoader/SkeletonLoader";
import TasksBlock from "./blocks/tasksBlock/tasksBlock";



const Dashboard = () => {
    const { role } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuleret ventetid på 2 sekunder
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Ryd timeren, hvis komponenten bliver afmonteret
        return () => clearTimeout(timer);
    }, []);

    
    
    
    
    

    return (
         <div className={styles.dashboard}>
            <div className={styles.dashboardContent}>
                {loading ? (
                    <div className={styles.skeletonContainer}>
                        <SkeletonLoader/>
                    </div>
                    
                
                    
                ) : role === "admin" ? (
                    <div className={styles.dashboardBlocksAdmin}>
                        <UsersBlock />
                        <TasksBlock />
                       
                    </div>
                ) : role === "user" ? (
                    <div>User Content</div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )

};

export default Dashboard;