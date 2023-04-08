import { IEntry } from 'models';
import { db } from 'database';
import { Entry } from 'models';
import { isValidObjectId } from "mongoose";

export const getEntryByID = async (id: string): Promise<IEntry | null> => {

    if(!isValidObjectId(id)) return null;

    await db.connect();

    const entry = await Entry.findById(id).lean();

    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
};
