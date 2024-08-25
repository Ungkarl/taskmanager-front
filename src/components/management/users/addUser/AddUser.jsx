import styles from "./addUser.module.css";
import { useAuth } from "../../../../hooks/useAuth";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners"; // Import the spinner
import { BiShow, BiHide } from "react-icons/bi";
const AddUser = () => {
    const navigate = useNavigate(); 
    const [image, setImage] = useState('/vite.svg');
    const { addUser } = useOutletContext();
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(false); // Loading state
    const [showPassword, setShowPassword] = useState(false);

    const onImageChange = (e) => {
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", e.target.files[0]);
    };

    const onSubmit = async (data) => {
        setLoading(true); // Start loading

        // Minimum loading time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        formData.append('password', data.password);
        formData.append('email', data.email);
        formData.append('role', data.role);

        const addUserResult = addUser(formData);

        // Wait for both the minimum loading time and the actual add user result
        await Promise.all([minLoadingTime, addUserResult]);

        setLoading(false); // Stop loading
        navigate('/management/users');
    }

    if (loading) {
        return <div className={styles.loading}><PropagateLoader color="#7e3f9d" size={20} /></div>;
    }

    return (
        <div className={styles.addUserContainer}>
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
                        defaultValue="Andreas"
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Password
                    <div className={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            defaultValue="1234"
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.showPasswordButton}
                        >
                            {showPassword ? <BiHide /> : <BiShow />}
                        </button>
                    </div>
                </label>

                <label className={styles.label}>
                    Email
                    <input
                        type="email"
                        {...register("email")}
                        defaultValue="andreas@gmail.com"
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Role
                    <select {...register("role")} className={styles.input}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>

                <button className={styles.button} type="submit">CREATE</button>
            </form>
        </div>
    );
};

export default AddUser;
