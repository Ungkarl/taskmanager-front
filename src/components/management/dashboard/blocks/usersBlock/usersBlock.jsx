import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./usersBlock.module.css";


const UsersBlock = () => {
    const { users } = useOutletContext();
    const navigate = useNavigate();

    const handleBlockClick = () => {
        navigate('/management/users');
    }
    

    return (
     
        <div className={`${styles.usersBlock} ${styles.tall}`} onClick={handleBlockClick}>
            <h2>USERS</h2>
            <div className={styles.users}>
            {users.slice(0, 4).map(user => (
                    <div key={user._id} className={styles.user}>
                       
                            <div className={styles.userImg}>
                                <img src={`http://localhost:3042${user.picture}`} alt="" />
                            </div>
                            <div className={styles.userInfo}>
                                <div><h3>{user.name}</h3></div>
                                <div><p>{user.email}</p></div>
                                <div><p>{user.role}</p></div>
                            </div>

                        
                    </div>
                ))}
            </div>
               
            
        </div>
      
    )

}

export default UsersBlock;