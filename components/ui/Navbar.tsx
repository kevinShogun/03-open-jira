import { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { grey } from "@mui/material/colors";
import { UIContext } from "context/ui";

export function Navbar() {

	const {openSideMenu} = useContext(UIContext)

	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton size="large" edge="start" sx={{ color: grey[100] }}
					onClick={openSideMenu}
				>
					<MenuRoundedIcon />
				</IconButton>
				<Typography variant="h6">Open Jira</Typography>
			</Toolbar>
		</AppBar>
	);
}
