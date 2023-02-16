import { FC, ReactNode, useReducer } from 'react';
import {v4 as uudiv4} from 'uuid'
import { Entry } from 'interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children: ReactNode | ReactNode[];
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uudiv4(),
            description: 'Esta es una tarea',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            _id: uudiv4(),
            description: 'Esta es una tarea',
            createdAt: Date.now() - 10000,
            status: 'in-progress'
        },
        {
            _id: uudiv4(),
            description: 'Esta es una tarea',
            createdAt: Date.now() - 100000,
            status: 'finished'
        },
        
    ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = (description: string) => { 
        
        const newEntry: Entry = {
            _id: uudiv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({
            type: 'Entries - Add',
            payload: newEntry
        })

    }

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                //Methods
                addNewEntry
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};