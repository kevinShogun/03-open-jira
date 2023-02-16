import { useContext } from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { UIContext } from "context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
	const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
			<Box sx={{ width: 250 }}>
				<Box
					sx={{
						padding: "5px 10px",
					}}
				>
					<Typography variant="h5">Menú</Typography>
				</Box>
				<List>
					{menuItems.map((i, index) => (
						<ListItem key={index} button>
							<ListItemIcon>
								{index % 2 ? <InboxTwoToneIcon /> : <MailTwoToneIcon />}
							</ListItemIcon>
							<ListItemText primary={i} />
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};
