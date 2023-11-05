const getFileFromUrl = async (url) => {
  try {
    let res = await fetch(url)
    return await res?.blob()
  } catch(err) {
    console.log(err)
  }
}

export default getFileFromUrl;