import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "rgb(17 24 39)",
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
						backgroundColor: "rgb(17 24 39)",
					},
				},
			},
		},
		MuiCard: {
			defaultProps: {
				style: {
					backgroundColor: "rgb(31 41 55)",
				},
			},
		},
	},
});
