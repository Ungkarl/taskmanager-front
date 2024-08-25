import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useOutletContext, Outlet } from "react-router-dom";
import UsersBlockExtended from "./usersBlockExtended/usersBlockAdmin";
import { set } from "react-hook-form";


const Users = () => {
  const { role, users } = useOutletContext();
  const navigate = useNavigate();
  const { token, setUsers   } = useAuth();

  useEffect(() => {
    if (role === "user") {
      navigate('/management');
    }
  }, [role, navigate]);

  const addUser = async (formData) => {
    try {
        const response = await fetch('http://localhost:3042/user', {
            method: 'POST',
            headers: {
                    'Authorization': `Bearer ${token}`,
            },
            body: formData
    
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.json();
        setUsers([...users, result.data]);
    } catch (error) {
        console.error('Failed to add user:', error);
    }
    
  }

  const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:3042/user?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
        setUsers(users.filter(user => user._id !== id));
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};

const updateUser = async (formData) => {
    try {

        const response = await fetch('http://localhost:3042/user', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              

            },
            body: formData

        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let result = await response.json();
        setUsers(users.map(user => user._id === result.data._id ? result.data : user));
    }
    catch (error) {
        console.error('Failed to update user:', error);
    }

};

  return (
    <div>
      {role === "admin" ? (
        <div>
            <UsersBlockExtended />
            <Outlet context={{deleteUser, addUser, updateUser }} />
        </div>
      ) : null}
    </div>
  );
};

export default Users;