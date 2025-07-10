import {getAllContacts, getContactById, createContact, updateContact, deleteContact} from '../services/contacts.js';
import {parsePaginationParams} from '../utils/parsePaginationParams.js';
import {parseSortParams} from '../utils/parseSortParams.js';
import {parseFilterParams} from '../utils/parseFilterParams.js'; 
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import {getEnvVar} from '../utils/getEnvVar.js';
import {saveFileToCloudinary} from '../utils/saveFileToCloudinary.js';

export const getContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
   const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({ userId, page, perPage, sortBy, sortOrder, filter });
    res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);   
    
	/*if (!contact) {
	  res.status(404).json({
		  message: 'Contact not found'
	  });
	  return;
	}*/

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };

export const createContactController = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;
   if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, "Missing required fields: name, phoneNumber or contactType");
  }

   const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contactData = {
      ...req.body,
      userId: req.user._id,
      photo: photoUrl,
    };

  const contact = await createContact(contactData);
  res.status(201).json({
    status: 201,
		message: "Successfully created a contact!",
		data: contact
  })
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

   if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, userId, req.body, photoUrl,);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};