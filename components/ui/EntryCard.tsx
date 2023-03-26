import { DragEvent, FC, useContext } from "react";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { Entry } from "interfaces";
import { UIContext } from "context/ui";

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDraggin, endtDraggin } = useContext(UIContext);

	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData("text", entry._id);
		startDraggin();
	};

	const onDragEnd = () => {
		endtDraggin();
	};

	return (
		<Card
			sx={{
				margin: 1,
			}}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			
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
