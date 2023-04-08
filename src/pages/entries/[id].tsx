import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import {
	capitalize,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	IconButton,
	Dialog,
	Slide,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Entry, EntryStatus } from "interfaces";
import { Layout } from "components/layouts";
import { dbEntries } from "database";
import { EntriesContext } from "context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "utils";
import { TransitionProps } from "@mui/material/transitions";
import { entriesApi } from "apis";

const validStatus = ["pending", "in-progress", "finished"] as const;

interface Props {
	entry: Entry;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EntryView: FC<Props> = ({ entry }) => {
	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [open, setOpen] = useState(false);
	const [touched, setTouched] = useState(false);
	const { updateEntry, deleteEntry } = useContext(EntriesContext);
	const router = useRouter();

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	);

	const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onStatusChage = (e: ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.value);
		setStatus(e.target.value as EntryStatus);
	};

	const onSaved = () => {
		if (inputValue.trim().length === 0) return;

		const updatedEntry: Entry = {
			...entry,
			status,
			description: inputValue,
		};

		updateEntry(updatedEntry, true);

		setTimeout(() => {
			router.push("/");
		}, 500);
	};

	const onDelete = async () => {
		try {
			
			deleteEntry(entry._id);

			setTimeout(() => {
				router.push("/");
			}, 500);

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout title={inputValue.substring(0, 20) + "..."}>
			<Grid
				container
				justifyContent={"center"}
				sx={{
					marginTop: 2,
				}}
			>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada`}
							subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
								entry.createdAt
							)}`}
						/>
						<CardContent>
							<TextField
								sx={{
									marginBottom: 2,
									marginTop: 2,
								}}
								fullWidth
								placeholder="Entry Content"
								multiline
								autoFocus
								label="Entry Content"
								value={inputValue}
								onChange={onTextFieldChanged}
								helperText={isNotValid && "Ingrese un valor"}
								onBlur={() => setTouched(true)}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row onChange={onStatusChage} value={status}>
									{validStatus.map((status) => (
										<FormControlLabel
											key={status}
											value={status}
											control={<Radio />}
											label={capitalize(status)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveRoundedIcon />}
								variant="contained"
								color="success"
								fullWidth
								onClick={onSaved}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setOpen(false)}
				PaperProps={{
					style: {
						backgroundColor: "rgb(2 6 23)",
					},
				}}
				sx={{
					color: "black",
				}}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>
					{"¿Seguro que quieres eliminar esta entrada?"}
				</DialogTitle>
				<DialogContent
					sx={{
						color: "black",
					}}
				>
					<DialogContentText id="alert-dialog-slide-description">
						Esta entrada contiene información importante que puede ser útil en
						el futuro. Si la eliminas, no podrás recuperarla ni acceder a ella
						de nuevo. Por favor, piensa bien si quieres borrarla o no.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpen(false)}
						variant="outlined"
						color="error"
					>
						Cancelar
					</Button>
					<Button onClick={onDelete}>Aceptar</Button>
				</DialogActions>
			</Dialog>

			<IconButton
				sx={{
					position: "fixed",
					bottom: 30,
					right: 30,
					backgroundColor: "error.dark",
				}}
				onClick={() => setOpen(true)}
			>
				<DeleteOutlineRoundedIcon />
			</IconButton>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryByID(id);

	if (!entry) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			entry,
		},
	};
};

export default EntryView;
