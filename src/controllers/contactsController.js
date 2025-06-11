import {getAllContacts, getContactById} from '../services/contacts.js';

export const getContacts = async (req, res) => {
    try{
    const contacts = await getAllContacts();
    res.status(200).json({
    message: "Successfully found contacts!",
    data: contacts,
  });
} catch (error) {
 res.status(500).json({
    message: "Not found contacts!", error
 })
}
};

export const getContactByIdController = async (req, res) => {
    try{
    const { contactId } = req.params;
    const contact = await getContactById(contactId);   
    
	if (!contact) {
	  res.status(404).json({
		  message: 'Contact not found'
	  });
	  return;
	}

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
    } catch (error) {
         res.status(500).json({
    message: "Not found contacts!", error
 })
    }
  };
