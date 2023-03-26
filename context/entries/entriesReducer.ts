import { Entry } from "./../../interfaces/entry";
import { EntriesState } from "./";

type entriesActions =
	| { type: "Entries - Add"; payload: Entry }
	| { type: "Entries - Update"; payload: Entry };

export const entriesReducer = (
	state: EntriesState,
	action: entriesActions
): EntriesState => {
	switch (action.type) {
		case "Entries - Add":
			return {
				...state,
				entries: [...state.entries, action.payload],
			};
		case "Entries - Update":
			return {
				...state,
				entries: state.entries.map((entry) => {
					if (entry._id === action.payload._id) {
						entry.status === action.payload.status;
						entry.description === action.payload.description;
					}
					return entry;
				}),
			};
		default:
			return state;
	}
};
