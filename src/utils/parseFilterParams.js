const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) => ["work", "home", "personal"].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavorite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavorite = parseIsFavorite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};
