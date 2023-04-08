import { NextApiRequest, NextApiResponse } from "next";
import { db } from "database";
import { Entry, IEntry } from "models";
import mongoose from "mongoose";

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: "El id no es válido" + id });
	}

	switch (req.method) {
		case "PUT":
			return updateEntry(req, res);
		case "GET": 
			return getOneEntry(req, res);
		case "DELETE":
			return deleteEntry(req, res);
		default:
			return res.status(400).json({ message: "Endpoint no existe" });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();

	const entryToUpate = await Entry.findById(id);

	if (!entryToUpate) {
		await db.disconnect();
		return res.status(400).json({ message: "No existe es id: " + id });
	}

	const {
		description = entryToUpate.description,
		status = entryToUpate.status,
	} = req.body;

	try {
		const updateEntry = await Entry.findByIdAndUpdate(
			id,
			{
				description,
				status,
			},
			{
				runValidators: true,
				new: true,
			}
		);
		await db.disconnect();
		res.status(200).json(updateEntry!);
	} catch (error: any) {
		console.log(error);
		await db.disconnect();
		return res
			.status(400)
			.json({
				message: `Ocurrio un error al momento de actulizar el objeto con ID: ${id} -  ${error.erros.status.message}`,
			});
	}

	/**
	 * entryToUpate.description = description
	 * entryToUpate.status = status
	 * await entryToUpate.save();
	 */
};

const getOneEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	
	const { id } = req.query;

	await db.connect();
	const thisEntry = await Entry.findById(id);
	await db.disconnect();

	if (!thisEntry) {
		await db.disconnect();
		return res
			.status(400)
			.json({
				message: `Ocurrio un error al momento de mandar a traer el objeto con ID: ${id}`,
			});
	}

	res.status(200).json(thisEntry!);
}


const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { id } = req.query;

	await db.connect();

	try {
		await Entry.deleteOne({_id: id});
		
		return res.status(200)
		.json({
			message: `Eliminacion correcta del objeto: ${id}`,
		});
		
	} catch (error) {
		await db.disconnect();
		console.log(error);
		return res
			.status(500)
			.json({
				message: `Ocurrio un error al momento de eliminar el objeto con ID: ${id}`,
			});
	}

}


