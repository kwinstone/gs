import { useState } from "react"
import stService from "../../../services/stService"
import { useSelector } from "react-redux"
const st = new stService()

const useStories = () => {
  const {token} = useSelector(s => s)
  const [list, setList] = useState([])

  const initStories = () => {}

  const deleteStorie = () => {
    if(token) {
      st.deleteStorieImage(token, )
    }
  }

  return {
    list,

    initStories,
  }
}


export default useStories;
