import { useLocalStorage } from "@uidotdev/usehooks";   
import { createContext, useEffect, useState } from "react"; 
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";


export const AuthContextProvider = ({ children }) => {
    const [auth, saveAuth] = useLocalStorage("auth", {});
    const [user, setUser] = useState({});
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();



    useEffect(() => {
        const checkUser = async () => {
            if (location.pathname.includes('management') && !location.pathname.includes('signin')) {
               if (auth.token !== undefined) {
                let response = await fetch('http://localhost:3042/auth/token', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({token: auth.token})
                });
                let result = await response.json();

                if (result.message === 'Token Expired') {
                    saveAuth({});
                    setUser({});
                    navigate('/management/signin');
                }
                else {
                    setUser(result.data);
                    setRole(result.data.role);
                }
               } else {
                    return navigate('/management/signin');
               }
            }
        };
        checkUser();
    }, [location.pathname, auth.token, navigate, saveAuth])

    useEffect(() => {
        const fetchUsers = async () => {
            let response = await fetch('http://localhost:3042/users', {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setUsers(result.data);
        }
        fetchUsers();


    }, []);

    useEffect(() => { 
        const getTasks = async () => {
            let response = await fetch('http://localhost:3042/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let result = await response.json();
            setTasks(result.data);

        }
        getTasks();
    }, [])






   const token = auth.token ? auth.token : '';
   const signedIn = auth.token !== undefined;

   const signIn = async (email, password) => {
    let response = await fetch('http://localhost:3042/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    let result = await response.json();
    console.log(result);
    //check if token is string or is there
    if (result.data === undefined || typeof result.data.token !== 'string' || result.data.token.trim() === '') {
        return false;
    } else {
        saveAuth({ token: result.data.token });
        const user = jwtDecode(result.data.token);
        setUser(user);
        return user;
    }
};
    

   const getUser = () => {
    return token !== '' ? jwtDecode(token) : {};
   }

   const signOut = () => {
    saveAuth({});
    setUser({});
    
    
   };

   const value = { token, user, getUser, signIn, signOut, signedIn, users, setUsers, role, tasks, setTasks, setRole };


   return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

   )

};

export const AuthContext = createContext({});