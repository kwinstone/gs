const getBase64 = (file, type = 'base64') => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      if(type === 'base64') {
        reader.readAsDataURL(file);
      }
      if(type === 'arrayBuffer') {
        reader.readAsArrayBuffer(file);
      }
      if(type === 'text') {
        reader.readAsText(file)
      }
      
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export default getBase64