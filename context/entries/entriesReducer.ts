import { Entry } from "./../../interfaces/entry";
import { EntriesState } from "./";

type entriesActions = { type: "Entries - Add"; payload: Entry };

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
		default:
			return state;
	}
};
