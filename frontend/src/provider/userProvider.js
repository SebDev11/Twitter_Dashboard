import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const UserContext = createContext()

const useAuth = () => {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null)
  useEffect(() => {
    const fetchUser = async() => {
      const token = localStorage.getItem('token');
      if( !token ) {
        setLoading(false)
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/auth/user', {
          headers: {
            Authorization: token,
          }
        })
        setUser(response.data.user);
        setLoading(false);
      } catch(err) {
        setError(err.response?.data?.msg);
        setLoading(false);
      }
    }
    fetchUser();
  }, [])
  return { user, loading, error };
}

function UserProvider({children}) {
    const authData = useAuth()
    return (
        <UserContext.Provider value = {authData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider