import styles from "./managementNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "/logo.png"
import Profile from "../../profile/Profile";



const ManagementNavigation = ({ role }) => {
    return (
        <div className={styles.managementNav}>
            <div className={styles.managementNavLogo}>
                <img className={styles.managementLogo} src={Logo} alt="Logo" />
            </div>

            

            <div className={styles.managementNavLinks}>
                {role === "admin" ? (
                    <ul>
                        <li>
                            <NavLink
                                to="/management/dashboard"
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/management/users"
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/management/tasks"
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                Task Management
                            </NavLink>
                        </li>
                    </ul>
                ) : role === "user" ? (
                    <ul>
                        <li>
                            <NavLink
                                to="/management/dashboard"
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/management/tasks"
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                Open Tasks
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <div></div>
                )}
            </div>
            <Profile />
        </div>
    );
};

export default ManagementNavigation;