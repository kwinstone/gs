import { useEffect, useState } from "react";

const useStorieEditor = () => {
  const [media, setMedia] = useState(null)
  const [textList, setTextList] = useState([])
  const [grad, setGrad] = useState(null)

  // useEffect(() => {
  //   if(data) {
  //     initEditor({
  //       media: data?.media,
  //       textList: data?.textList,
  //       grad: data?.grad
  //     })
  //   } else {
  //     initEditor({
  //       media: null,
  //       textList: [],
  //       grad: {value: 0, label: '0%'},
  //     })
  //   }
  // }, [data])

  const initEditor = ({
    media,
    textList,
    grad
  }) => {
    setGrad(grad)
    setMedia(media)
    setTextList(textList)
  }

  const addText = ({
    value,
    title,
    fontSize,
    color,
    coords
  }) => {
    setTextList(s => [...s,
    {
      value,
      title,
      fontSize,
      fontWeight: 500,
      color,
      coords
    }])
  }

  const deleteText = (itemIndex) => {
    setTextList(s => s.filter((_,index) => index !== itemIndex))
  }

  const editText = ({
    data,
    itemIndex
  }) => {  
    setTextList(s => s.map((i,index) => {
      if(index === itemIndex) {
        return {
          ...i,
          ...data
        }
      } else {
        return i;
      }
    }))
  }

  const onMoveText = () => {

  }

  const onGradSelect = (value) => {
    setGrad(value)
  }

  const onReset = () => {
    setGrad({value: 0, label: '0%'})
    setMedia(null)
    setTextList([])
  }

  return {
    media,
    textList,
    grad,

    initEditor,
    addText,
    deleteText,
    editText,
    onMoveText,
    onGradSelect,
    onReset
  }
}

export default useStorieEditor;