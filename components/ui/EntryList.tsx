import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "interfaces";
import { UIContext } from "context/ui";
import { EntriesContext } from "context/entries";
import { EntryCard } from "./";
import style from './EntryList.module.css'
interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDraggin, endtDraggin } = useContext(UIContext);

	const entriesByStatus = useMemo(
		() => entries.filter((e) => e.status === status),
		[entries, status]
	);

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		const id = e.dataTransfer.getData('text');

		const entry = entries.find(e => e._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endtDraggin();

		
	};

	const allowDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		// TODO: Aqui va el drop
		<div onDrop={onDrop} onDragOver={allowDrop}
		className={ isDraggin ? style.draggin : ''}
		>
			<Paper
				sx={{
					height: "calc(100vh - 250px)",
					overflowY: "scroll",
					overflowX: "hidden",
					backgroundColor: "transparent",
				}}
			>
				<List sx={{ opacity: isDraggin ? 0.4 : 1, transition: 'all ease-in 0.5s' }}>
					{entriesByStatus.map((e, index) => (
						<EntryCard key={e._id} entry={e} />
					))}
				</List>
			</Paper>
		</div>
	);
};
