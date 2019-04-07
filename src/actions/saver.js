export default store => next => (action) => {
  const result = next(action);
  const { locations } = store.getState();
  localStorage.setItem('locations', JSON.stringify({ locations }));
  return result;
};
