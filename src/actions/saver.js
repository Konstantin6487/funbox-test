export default storageStub => store => next => (action) => {
  const storage = storageStub || localStorage;
  const result = next(action);
  const { locations } = store.getState();
  storage.setItem('locations', JSON.stringify({ locations }));
  return result;
};
