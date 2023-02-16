import { FC, ReactNode, useReducer } from "react";
import { UIContext, uiReducer } from "./";

interface Props {
	children: ReactNode | ReactNode[];
}

export interface UIState {
	sideMenuOpen: boolean;
	isAddingEntry: boolean
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
	isAddingEntry: false
};

export const UIProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({
			type: "UI - Open Sidebar",
		});
	};

    const closeSideMenu = () => { 
        dispatch({
            type: 'UI - Close Sidebar'
        })
    }

	const setIsAddingEntry = (state: boolean) => {
		dispatch({
			type: 'UI - Toggle isAddingEntry',
			payload: state
		})
	}

	return (
		<UIContext.Provider
			value={{
				...state,
				// Methods
				openSideMenu,
                closeSideMenu,
				setIsAddingEntry
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
