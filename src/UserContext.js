import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedEmail = sessionStorage.getItem('email');
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};
