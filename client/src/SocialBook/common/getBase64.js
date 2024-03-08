export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({
      returnKey: 1,
      data: reader.result,
    });
    reader.onerror = () => reject({
      returnKey: 0,
      data: "",
    });
  });
};
