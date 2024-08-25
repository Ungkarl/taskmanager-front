import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PropagateLoader } from 'react-spinners'; // Import the spinner
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./DeleteUser.module.css";

const DeleteUser = () => {
    const { users } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const { deleteUser } = useOutletContext();

    useEffect(() => {
        const fetchUser = async () => {
            // Simuleret ventetid på 2 sekunder
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const user = users.find(user => user._id === id);
            setUser(user);
        }
        fetchUser();
    }, [users, id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Simuleret ventetid på 2 sekunder
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Kald deleteUser fra useOutletContext
        await deleteUser(id);
        navigate('/management/users');

        setLoading(false); // Stop loading
    }

    if (loading) {
        return <div className={styles.loading}><PropagateLoader color="#a05ed3" size={20} /></div>;
    }

    if (!user) {
        return  <div className={styles.loading}><PropagateLoader color="#a05ed3" size={20} /></div>;
    }

    return (
        <div className={styles.deleteUserContainer}>
            <div className={styles.user}>
                <Link to="/management/users" className={styles.userBackButton}><IoIosArrowRoundBack /></Link>
                <div className={styles.userImgContainer}>
                    <img className={styles.userImg} src={`http://localhost:3042${user.picture}`} alt="User" />
                </div>
                <div className={styles.userInfo}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
                <button className={styles.deleteConfirmBtn} onClick={handleDelete}>CONFIRM DELETION</button> 
            </div>
        </div>
    );
};

export default DeleteUser;
