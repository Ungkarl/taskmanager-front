import styles from './signInPage.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners'; // Import the spinner

const SignInPage = () => {
    const { signIn, signOut } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [emailNotEmpty, setEmailNotEmpty] = useState(false);
    const [passwordNotEmpty, setPasswordNotEmpty] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const { setRole } = useOutletContext();


    
    const onSubmit = async (data) => {
        setLoading(true); // Start loading

        // Minimum loading time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        const { email, password } = data;

        const signInResult = signIn(email, password);

        // Wait for both the minimum loading time and the actual sign-in result
        await Promise.all([minLoadingTime, signInResult]);

        setLoading(false); // Stop loading

        if (await signInResult) {
            navigate('/management');
        } else {
            alert('Invalid email or password');
        }
    }

    useEffect(() => {
        setValue('email', 'taskmaster@mcdm.dk')
        setValue('password', 'taskmaster')
    }, [setValue])

    const emailValue = watch('email', '');
    const passwordValue = watch('password', '');

    useEffect(() => {
        setEmailNotEmpty(emailValue.trim() !== '');
        setPasswordNotEmpty(passwordValue.trim() !== '');
    }, [emailValue, passwordValue]);

    if (loading) {
        return <div className={styles.loading}><PropagateLoader color="#a05ed3"  size={20} /></div>;
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <input
                        type="text"
                        {...register('email', { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                        className={`${emailNotEmpty ? styles.notEmpty : ''} ${errors.email ? styles.error : ''}`}
                    />
                    <p className={styles.emailHint}>Email</p>
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </label>

                <label>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className={`${passwordNotEmpty ? styles.notEmpty : ''} ${errors.password ? styles.error : ''}`}
                    />
                    <p className={styles.passwordHint}>Password</p>
                    {errors.password && <p className={styles.errorText}>Password is required</p>}
                </label>

                <div className={styles.buttons}></div>

                <button className={styles.button} type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
