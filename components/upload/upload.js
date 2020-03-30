import React, { useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import Ajax from './ajax.js'

// 抽离组件
function Upload(props) {
  const {
    prefixCls,
    action,
    headers,
    accept,
    drag,
    withCredentials,
    name,
    data,
    multiple,
    beforeUpload,
    customRequest,
    disabled,
    listType,
    previewFile,
    onPreview,
    onRemove,
    classname,
    children,
    onError,
    onSuccess,
    onProgress,
    onStart,
    ...attr
  } = props
  const inputFileRef = useRef()

  function openFileChoose () {
    inputFileRef.current.value = null
    inputFileRef.current.click()
  }
  function fileChange () {
    let files = inputFileRef.current.files
    if (!files) return;
    const rawFile = [...files]
    for (let i = 0; i < rawFile.length; i++) {
      const item = rawFile[i];
      onStart(item)
      uploadFile(item)
    }
  }

  function uploadFile(rawFile) {
    if (!beforeUpload) {
        post(rawFile)
      return
    }
    const before = beforeUpload()
    if (before && before.then) {
      before.then(file=>{
        const fileType = Object.prototype.toString.call(file)
        if (['object File', 'object Blob'].includes(fileType)) {
          if (['object Blob'].includes(fileType)) {
            file = new File([file], rawFile.name, {
              type: rawFile.type
            })
          }
          for(const key in rawFile) {
            if (rawFile.hasOwnProperty(key)) {
              file[key] = rawFile[key]
            }
          }
          post(file)
        } else {
          post(rawFile)
        }
      }, (err)=>{
        onError(err, rawFile);
      })
    } else if (before !== false) {
      return post(rawFile)
    } else {
      return
    }
  }
  function post (rawFile) {
    const options = {
      data,
      name,
      withCredentials,
      action,
      headers,
      file: rawFile,
      onProgress: (e) => {
        onProgress(e, rawFile);
      },
      onSuccess: (e) => {
        onSuccess(e, rawFile);
      },
      onError: (err) => {
        onError(err, rawFile);
      }
    }
    customRequest(options)
  }
  return (
    <div className={cls(prefixCls,classname)}  {...attr}>
      <input
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        ref={inputFileRef}
        onChange={fileChange}
      />
      <div className={cls(`${prefixCls}-tigger`,)} onClick={openFileChoose}>
        {children}
      </div>
    </div>
  )
}
Upload.propTypes = {
  prefixCls: PropTypes.string,
  action: PropTypes.string.isRequired,
  headers: PropTypes.object,
  accept: PropTypes.string,
  drag: PropTypes.bool,
  withCredentials: PropTypes.bool,
  name: PropTypes.string,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  beforeUpload: PropTypes.func,
  customRequest: PropTypes.func,
  disabled: PropTypes.func,
  listType: PropTypes.func,
  previewFile: PropTypes.func,
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onStart: PropTypes.func,
}
Upload.defaultProps = {
  prefixCls: '',
  drag: false,
  name: 'file',
  multiple: false,
  customRequest: Ajax,
}
export default React.memo(Upload)