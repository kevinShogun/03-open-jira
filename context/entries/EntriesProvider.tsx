import { FC, ReactNode, useEffect, useReducer } from "react";
import { Entry } from "interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "apis";

interface Props {
	children: ReactNode | ReactNode[];
}

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>("/entries", { description });

		dispatch({
			type: "Entries - Add",
			payload: data,
		});
	};

	const updateEntry = async ({ _id, description, status }: Entry) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description: description,
				status: status,
			});

			dispatch({
				type: "Entries - Update",
				payload: data,
			});
		} catch (error) {
            console.log(error);
        }
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>("/entries");
		dispatch({ type: "Entries - Refresh-Data", payload: data });
	};

	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider
			value={{
				...state,
				//Methods
				addNewEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
