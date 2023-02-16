import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		background: {
			default: grey[100],
		},
		primary: {
			main: "#4a148c",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
			},
			styleOverrides: {
				root: {
					backgroundColor: "rgb(124 58 237)",
				},
			},
		},
		MuiDrawer: {
			defaultProps: {
				SlideProps: {
					style: {
						backgroundColor: "rgb(255 255 251)",
					},
				},
			},
		},
		MuiCard: {
			defaultProps: {
				style: {
					backgroundColor: "rgb(243 244 246)",
				},
			},
		},
	},
});
