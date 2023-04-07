import { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import Add from "@mui/icons-material/AddCircleTwoTone";
import { EntriesContext } from "context/entries";
import { UIContext } from "context/ui";

export const NewEntry = () => {
	const [inputValue, setInputValue] = useState("");
	const [touched, setTouched] = useState(false);

	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

	const onSave = () => {
		if (inputValue.length === 0) return;
		addNewEntry(inputValue);
		setInputValue("");
		setTouched(false);
		setIsAddingEntry(false);
	};

	return (
		<Box
			sx={{
				marginBottom: 2,
				padding: "0px 14px",
			}}
		>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder="Nueva entrada"
						autoFocus
						multiline
						label="Nueva entrada"
						value={inputValue}
						helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
						error={inputValue.length <= 0 && touched}
						onChange={(e) => setInputValue(e.target.value)}
						onBlur={() => setTouched(true)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button
							variant="text"
							color="error"
							onClick={() => {
								setTouched(false);
								setIsAddingEntry(false);
							}}
						>
							Cancelar
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							endIcon={<SaveTwoToneIcon />}
							onClick={onSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					fullWidth
					variant="outlined"
					startIcon={<Add />}
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar
				</Button>
			)}
		</Box>
	);
};
