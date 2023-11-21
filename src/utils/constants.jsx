export const getToken = () => {
  return localStorage.getItem('auth-token');
};

export const ITEMS_PER_PAGE=10;