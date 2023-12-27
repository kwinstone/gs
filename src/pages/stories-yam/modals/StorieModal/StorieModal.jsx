import Button from '../../../../components/Button/Button';
import getClassNames from '../../../../funcs/getClassNames';
import styles from './StorieModal.module.scss';
import { Modal, Row, Col } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import useStorieEditor from './storieEditor';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Grad from './components/Grad/Grad';
import AddText from './components/AddText/AddText';
import TextPart from './components/TextPart/TextPart';
import Draggable from 'react-free-draggable';
import getBase64 from '../../../../funcs/getBase64';
import { toast } from "react-toastify";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const StorieModal = ({
  data,
  onCancel,
  onSaveStorie,
  ...otherProps
}) => {
  const editor = useStorieEditor()
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (data) {
      editor.initEditor({
        media: {
          type: data?.media?.type,
          // source: data?.media?.source,
          // file: data?.media?.file
        },
        grad: data?.grad,
        textList: data?.textList
      })
    } else {
      editor.initEditor({
        media: null,
        textList: [],
        grad: { value: 0, label: '0%' },
      })
    }
  }, [data])

  const onClose = () => {
    onCancel && onCancel()
    setFile(null)
    editor.onReset()
  }

  const onMediaUpload = (e) => {
    if (e.target.files[0].size / (1024 * 1024) > 10) {
      toast.error('Максимальный размер файла 10МБ')
    } else {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (file) {
      if (file?.type?.includes('image')) {
        getBase64(file).then(base64 => {
          editor.initEditor({
            media: { type: file?.type, source: base64, file: base64 },
            textList: [],
            grad: { value: 0, label: '0%' },
          })
        })

      }
      if (file?.type?.includes('video')) {
        file?.arrayBuffer().then(buffer => {
          const blob = new Blob([new Uint8Array(buffer)], { type: file.type });
          blobToBase64(blob).then(res => {
            editor.initEditor({
              media: { type: file?.type, source: res, file: res },
              textList: [],
              grad: { value: 0, label: '0%' },
            })
          })
          // editor.initEditor({
          //   media: {type: file?.type, source: file, file: blob},
          //   textList: [],
          //   grad: {value: 0, label: '0%'},
          // })
        })

      }
      if (file?.type?.includes('gif')) {
        getBase64(file).then(base64 => {
          editor.initEditor({
            media: { type: file?.type, source: base64, file: base64 },
            textList: [],
            grad: { value: 0, label: '0%' },
          })
        })
      }
    }
  }, [file])


  return (
    <Modal
      {...otherProps}
      onCancel={onClose}
      width={880}
      className={getClassNames(['Modal', styles.wrapper])}
    >
      <Row gutter={[25, 25]}>
        <Col span={24}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <div onClick={() => onClose()} className={styles.close}>
                <BsArrowLeft />Сториз
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.action}>
                <Button
                  onClick={() => {
                    if (data?.index >= 0 || data) {
                      onSaveStorie({
                        ...data,
                        // media: ...data?.media,
                        textList: editor.textList,
                        grad: editor.grad
                      }, data?.index)
                    } else {
                      onSaveStorie({
                        media: editor?.media,
                        textList: editor.textList,
                        grad: editor.grad
                      })
                    }
                    onClose()
                  }}
                  text={'Сохранить'}
                  styles={{ padding: '12px 35px', borderRadius: 20 }}
                // disabled={!file && !editor?.media?.source}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[25, 25]}>
            <Col span={12}>
              <div className={styles.field}>
                {
                  editor?.media ? (
                    <div
                      className={getClassNames([styles.img, 'drag-bound'])}>
                      <div style={{ backgroundColor: `rgba(0,0,0, .${editor?.grad?.value}` }} className={styles.mask}></div>
                      {
                        editor?.textList?.map((i, ind) => (
                          <Draggable
                            bounds={'.drag-bound'}
                            scale={1}
                            positionOffset={{
                              x: i?.coords[0],
                              y: i?.coords[1]
                            }}
                            onMove={(_, v) => {
                              editor?.editText({
                                data: {
                                  coords: [v.x, v.y]
                                },
                                itemIndex: ind
                              })
                            }}
                          >
                            <div
                              style={{
                                color: i?.color,
                                fontSize: i?.fontSize,
                                fontWeight: i?.fontWeight,
                                left: 0,
                                top: 0
                              }}
                              className={`${styles.layer} nekst-font`}
                            >{i?.value}</div>
                          </Draggable>

                        ))
                      }
                      {
                        editor?.media?.type?.includes('image') && (
                          <img src={editor?.media?.source ?? data?.media?.source ?? data?.PictureThumbnail} alt="" />
                        )
                      }
                      {
                        editor?.media?.type?.includes('video') && (
                          <video muted loop autoPlay src={editor?.media?.source ?? data?.media?.source ?? data?.PictureThumbnail} />
                        )
                      }
                    </div>
                  ) : (
                    <div className={styles.upload}>
                      <input
                        id='upload-storie'
                        type="file"
                        accept='.jpeg, .jpg, .png, .mp4'
                        onChange={onMediaUpload}
                        value={''}
                      />
                      <label htmlFor="upload-storie">
                        <span className={styles.icon}>
                          <AiOutlinePlus />
                        </span>
                        <span className={styles.label}>
                          Добавьте фото или видео
                        </span>
                      </label>
                    </div>
                  )
                }

                {/* text list */}

              </div>
            </Col>
            {
              editor?.media && (
                <Col span={12}>
                  <div className={styles.edit}>
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Grad
                          editor={editor}
                        />
                      </Col>
                      <Col span={24}>
                        <AddText
                          onClick={() => {
                            editor?.addText({
                              value: 'Текст',
                              title: `Текст #${editor?.textList?.length + 1}`,
                              fontSize: 16,
                              color: '#fff',
                              coords: [350 / 2, 635 / 2]
                            })
                          }}
                        />
                      </Col>
                      <Col span={24}>
                        {
                          editor?.textList?.length > 0 && (
                            <Row
                              style={{
                                maxHeight: 500,
                                overflowY: 'auto'
                              }}
                              gutter={[12, 12]}>
                              {
                                editor?.textList?.map((i, index) => (
                                  <Col key={index} span={24}>
                                    <TextPart
                                      data={i}
                                      itemIndex={index}
                                      editor={editor}
                                    />
                                  </Col>
                                ))
                              }
                            </Row>
                          )
                        }
                        {/* <Row gutter={[12, 12]}>
                          <Col span={24}>
                            <TextPart />
                          </Col>
                        </Row> */}
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
            }

          </Row>
        </Col>
      </Row>
    </Modal>
  )
}




export default StorieModal;