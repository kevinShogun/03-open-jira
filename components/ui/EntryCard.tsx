import { DragEvent, FC } from "react";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { Entry } from "interfaces";

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

	const onDragStart = (e: DragEvent) => { 
		e.dataTransfer.setData('text', entry._id);
	 }

	return (
		<Card
			sx={{
				margin: 1,
			}}
			draggable
			onDragStart={onDragStart}
		>
			<CardActionArea>
				<CardContent>
					<Typography
						sx={{
							whiteSpace: "pre-line",
						}}
					>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
				>
					<Typography variant="body2">hace 30 min</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
