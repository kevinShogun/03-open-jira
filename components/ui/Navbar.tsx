import { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { grey } from "@mui/material/colors";
import { UIContext } from "context/ui";
import Link from "next/link";

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

				<Link href="/" passHref
					style={{
						textUnderlineOffset: 0,
						textDecoration: "none"
					}}
				>
					<Typography variant="h6" 
					color="white"
					sx={{
						textUnderlineOffset: 0,
						textDecoration: "none"
					}}
					>Open Jira</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	);
}
