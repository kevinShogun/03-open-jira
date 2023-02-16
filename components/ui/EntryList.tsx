import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "interfaces";
import { EntriesContext } from "context/entries";
import { EntryCard } from "./";

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries } = useContext(EntriesContext);

	const entriesByStatus = useMemo(
		() => entries.filter((e) => e.status === status),
		[entries, status]
	);

	const onDrop = (e: DragEvent) => {};

	const allowDrop = () => {};

	return (
		// TODO: Aqui va el drop
		<div onDrop={onDrop} onDragOver={allowDrop}>
			<Paper
				sx={{
					height: "calc(100vh - 250px)",
					overflowY: "scroll",
					overflowX: "hidden",
					backgroundColor: "transparent",
				}}
			>
				<List sx={{ opacity: 1 }}>
					{entriesByStatus.map((e, index) => (
						<EntryCard key={e._id} entry={e} />
					))}
				</List>
			</Paper>
		</div>
	);
};
