import { UIState } from "./UIProvider";

type UIActions =
	| { type: "UI - Open Sidebar" }
	| { type: "UI - Close Sidebar" }
	| { type: "UI - Toggle isAddingEntry"; payload: boolean };

export const uiReducer = (state: UIState, action: UIActions): UIState => {
	switch (action.type) {
		case "UI - Open Sidebar":
			return {
				...state,
				sideMenuOpen: true,
			};
		case "UI - Close Sidebar":
			return {
				...state,
				sideMenuOpen: false,
			};
		case "UI - Toggle isAddingEntry":
			return {
				...state,
				isAddingEntry: action.payload,
			};
		default:
			return state;
	}
};
