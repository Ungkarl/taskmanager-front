import { useParams, useOutletContext, useNavigate, Link} from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PropagateLoader } from 'react-spinners';
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./editUser.module.css";
import { useForm } from "react-hook-form";
import { BiShow, BiHide } from "react-icons/bi";

const EditUser = () => {

    const { users } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateUser } = useOutletContext();
    const [image, setImage] = useState('/vite.svg');
    const { register, handleSubmit, setValue } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const onImageChange = (e) => {
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", e.target.files[0]);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        // Simuleret ventetid
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        formData.append('password', data.password);
        formData.append('email', data.email);
        formData.append('role', data.role);
        formData.append('id', id);

        // Opdatering af brugerdata
        const updateUserResult = updateUser(formData);

        // Vent på både minimum ventetid og opdateringen
        await Promise.all([minLoadingTime, updateUserResult]);

        setLoading(false);
        navigate('/management/users');
    };

    useEffect(() => {
        const fetchUser = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const user = users.find(user => user._id === id);
            setUser(user);
            setImage(`http://localhost:3042${user.picture}`);
        }
        fetchUser();
    }, [users, id]);

    if (loading) {
        return <div className={styles.loading}><PropagateLoader color="#a05ed3" size={20} /></div>;
    }

    if (!user) {
        return <div className={styles.loading}><PropagateLoader color="#a05ed3" size={20} /></div>;
    }

    return (
        <div className={styles.editUserContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Link to="/management/users" className={styles.backButton}>
                    <IoIosArrowRoundBack />
                </Link>
                <label className={`${styles.label} ${styles.imgLabel}`}>
                    Upload Billede
                    <img className={styles.usersImg} src={image} alt="User Preview" />
                    <input
                        type="file"
                        {...register("file")}
                        onChange={onImageChange}
                        className={`${styles.input} ${styles.ImgInputHidden}`}
                    />
                </label>

                <label className={styles.label}>
                    Name
                    <input
                        type="text"
                        {...register("name")}
                        defaultValue={user.name}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Email
                    <input
                        type="email"
                        {...register("email")}
                        defaultValue={user.email}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Password
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        defaultValue={user.password}
                        className={styles.input}
                    />
                    <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.showPasswordButton}
                        >
                            {showPassword ? <BiHide /> : <BiShow />}
                        </button>
                </label>

                <label className={styles.label}>
                    Role
                    <select
                        {...register("role")}
                        defaultValue={user.role}
                        className={styles.input}
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </label>

                <button className={styles.updateConfirmBtn} type="submit">CONFIRM UPDATE</button>
            </form>
        </div>
    );
};

export default EditUser;
