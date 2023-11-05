async function urlToFile(url){
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/png'
    };
    let file = new File([data], "thumbnail.png", metadata);
    return await file;
  }

  export default urlToFile;