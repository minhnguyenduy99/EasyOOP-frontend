const DEFAULT_FILE_NAME_LENGTH = 10;

export default (content, opts, fileName = makeid(DEFAULT_FILE_NAME_LENGTH)) => {
  const blob = new Blob([content], opts);
  const file = new File([blob], fileName);
  return file;
};

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
