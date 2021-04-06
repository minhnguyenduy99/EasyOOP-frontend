export default data => {
  const formData = new FormData();
  if (!data) {
    return formData;
  }
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  return formData;
};
