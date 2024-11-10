import { useContext } from 'react';
import { userContext } from './userContext';

export const useUser = () => {
    return useContext(userContext)
}