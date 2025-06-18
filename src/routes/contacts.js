import express from 'express';
import { getContacts, getContactByIdController, createContactController, patchContactController, deleteContactController } from '../controllers/contactsController.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts)); 

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;