import express from 'express';
import { getContacts, getContactByIdController, createContactController, patchContactController, deleteContactController } from '../controllers/contactsController.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {createContactSchema, updateContactSchema} from '../validation/contacts.js';
import {validateBody} from '../middlewares/validateBody.js';
import {isValidId} from '../middlewares/isValidId.js';
 
const router = express.Router();

router.get('/', ctrlWrapper(getContacts)); 

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;