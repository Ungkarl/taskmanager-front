import { useState, useEffect } from "react";
import styles from "./usersBlockAdmin.module.css";
import { TiUserAdd } from "react-icons/ti";
import { useOutletContext, Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const UsersBlockExtended = () => {
    const { users } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuleret ventetid på 2 sekunder
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Ryd timeren, hvis komponenten bliver afmonteret
        return () => clearTimeout(timer);
    }, []);

 
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  

    return (
        <div className={styles.usersContainer}>
            <h1>USERS ADMIN</h1>
            <div className={styles.searchUserBar}>
                <input
                    type="text"
                    placeholder="Search user"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Link to="/management/users/add" className={styles.usersAddBtn}><TiUserAdd /></Link>
            
            <div className={styles.users}>
                {filteredUsers.map(user => (
                    <div key={user._id} className={styles.user}>
                        <div className={styles.userImg}>
                            <img src={`http://localhost:3042${user.picture}`} alt="" />
                        </div>
                        <div className={styles.userInfo}>
                            <div><h3>{user.name}</h3></div>
                            <div><p>{user.email}</p></div>
                            <div><p>{user.role}</p></div>
                        </div>
                        <div className={styles.userActions}>
                            <Link className={styles.actionsLink} to={`/management/users/edit/${user._id}`}>Edit</Link>
                            <Link className={styles.actionsLink} to={`/management/users/delete/${user._id}`}>Delete</Link>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersBlockExtended;
