import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import UploadedList from './uploadedList.js'
import Ajax from './ajax.js'

function getFile (arr, item, uid) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element[uid] === item[uid]) {
      return i
    }
  }
}
function changed (rawFile) {
  return {
    rawFile: rawFile,
    uid: new Date() * -1 - Math.floor(Math.random() * 100),
    fileName: rawFile.name,
    fileSize: rawFile.size,
    progress: 0,
    status: 'ready',
  }
}
// function quchong(arr, item, id) {
//   let copyArr = [...arr]
//   if (!copyArr.length){
//     copyArr.push(item)
//     return copyArr
//   }
//   for (let i = 0; i < copyArr.length; i++) {
//     const element = copyArr[i];
//     if (element[id] === item[id]) {
//       copyArr.splice(i,1,item)
//       break
//     }
//   }
//   return copyArr
// }
function Upload(props) {
  const {
    prefixCls,
    action,
    headers,
    accept,
    drag,
    showFileList,
    withCredentials,
    name,
    data,
    multiple,
    beforeUpload,
    customRequest,
    disabled,
    listType,
    previewFile,
    onChange,
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
  // const FileListRef = useRef([])
  const [refalsh, setRefalsh] = useState(0)

  function openFileChoose () {
    inputFileRef.current.click()
  }
  function fileChange () {
    // FileListRef.current= []
    let files = inputFileRef.current.files
    if (!files) return;
    const rawFile = [...files]
    for (let i = 0; i < rawFile.length; i++) {
      const item = rawFile[i];
      // 增加了文件
      // const packFile = changed(item)
      // if(onChange) {
      //   console.log('onChange');
      //   onChange(packFile)
      // }
      onStart(rawFile)
      // changeList([...FileListRef.current, packFile])
      uploadFile(item)
    }
  }

  function changeList (arr) {
    FileListRef.current = arr
    setRefalsh(refalsh=>refalsh+1)
    if(onChange) {
      console.log('onChange');
      onChange(FileListRef.current)
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
        // let currentFileList = FileListRef.current
        // let fileIndex = getFile(FileListRef.current, rawFile, 'uid')
        // rawFile.progress = 100
        // rawFile.status = 'fail'
        // currentFileList.splice(fileIndex, 1, rawFile)
        // changeList(currentFileList)
        // onError(err, rawFile);
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
  function onRemoveHander (item, i) {
    if (i != null) {
      FileListRef.current.splice(i,1)
      changeList(FileListRef.current)
    }
    onRemove && onRemove(item, FileListRef.current)
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
      {showFileList && 
        <UploadedList prefixCls={prefixCls} onRemove={onRemoveHander} list={FileListRef.current} />
      }
    </div>
  )
}
Upload.propTypes = {
  prefixCls: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  headers: PropTypes.object,
  accept: PropTypes.string,
  drag: PropTypes.bool,
  showFileList: PropTypes.bool,
  withCredentials: PropTypes.bool,
  name: PropTypes.string,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  beforeUpload: PropTypes.func,
  customRequest: PropTypes.func,
  disabled: PropTypes.func,
  listType: PropTypes.func,
  previewFile: PropTypes.func,
  onChange: PropTypes.func,
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onStart: PropTypes.func,
}
Upload.defaultProps = {
  prefixCls: 'one-upload',
  drag: false,
  showFileList: false,
  withCredentials: true,
  name: 'file',
  multiple: false,
  customRequest: Ajax,
  onError: function (e,options) {
    console.log('翻车原因：');
    console.log(e);
    console.log(options.file.fileName+'翻车');
  },
  onSuccess: function (e,options) {
    console.log(options.file.fileName+'成功');
  },
  onProgress: function (e,options) {
    console.log(options.file.fileName+'进度'+options.file.progress);
  },
  onChange: function (e) {
    console.log('当前文件:');
    console.log(e);
    
  },
}
export default React.memo(Upload)