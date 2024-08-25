import { Outlet } from "react-router-dom";
import styles from "./managementPage.module.css";
import { useState, useEffect } from "react";
import ManagementNavigation from "../../components/management/managementNavigation/managementNavigation";
import { useAuth } from "../../hooks/useAuth";



const ManagementPage = () => {
    const {signedIn, getUser, token, users, role, tasks, setRole} = useAuth();


    useEffect(() => {
        setRole('');
    }, [signedIn]);

    

  

    


    
    return (
        <div className={styles.management}>
            <div className={styles.managementNav}>
                <ManagementNavigation role={role} />
            </div>

            <div className={styles.managementContent}>
                <Outlet context={{role, users, tasks}} />
            </div>

        </div>
        
    )
}

export default ManagementPage;