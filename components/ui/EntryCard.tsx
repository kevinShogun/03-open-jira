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
import { useRouter } from "next/router";
import { dateFunctions } from "utils";

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDraggin, endtDraggin } = useContext(UIContext);

	const router = useRouter();

	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData("text", entry._id);
		startDraggin();
	};

	const onDragEnd = () => {
		endtDraggin();
	};

	const onClickCard = () => { 
		router.push(`/entries/${entry._id}`);
	}

	return (
		<Card
			sx={{
				margin: 1,
			}}
			draggable
			onClick={onClickCard}
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
					<Typography variant="body2">{
						dateFunctions.getFormatDistanceToNow(entry.createdAt)
					}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
