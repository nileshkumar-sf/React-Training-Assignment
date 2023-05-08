import {createContext, useMemo} from 'react';
import UserRepository from '../repositories/User.repository';
import data from '../data/users.json';

export const UserDataContext = createContext<UserRepository>(
  {} as UserRepository,
);

const ContextProvider = (props: {children: any}) => {
  const providerValue = useMemo(() => new UserRepository(data), []);

  return (
    <UserDataContext.Provider value={providerValue}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default ContextProvider;
