import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import UploadedList from './uploadedList.js'
function getError(action, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody (ajax) {
  const text = ajax.responseText || ajax.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
function Ajax (options) {
  let postData = new FormData()
  postData.append(options.name, options.file)
  if (options.data) {
    Object.keys(options.data).forEach(key => {
      postData.append(key, options.data[key]);
    });
  }

  let ajax = new XMLHttpRequest()
  const headers = options.headers || {}
  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      ajax.setRequestHeader(item, headers[item]);
    }
  }
  if(options.onProgress) {
    ajax.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      options.onProgress(e, options);
    };
  }

  if(options.onError) {
    ajax.onerror = function (e) {
      options.onError(e, options);
    }
  }
  ajax.onload = function onload() {
    if (ajax.status < 200 || ajax.status >= 300) {
      return options.onError(getError(options.action, ajax),options);
    }

    options.onSuccess(getBody(ajax), options);
  };
  ajax.open('post', options.action, true)
  ajax.withCredentials = options.withCredentials
  ajax.send(postData)
  return ajax
}

function getFile (arr, item, uid) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element[uid] === item[uid]) {
      return i
    }
  }
}
function changed (rawFile, fn) {
  return {
    rawFile: rawFile,
    uid: new Date() * -1 ,
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
    ...attr
  } = props
  const inputFileRef = useRef()
  const FileListRef = useRef([])
  const [refalsh, setRefalsh] = useState(0)

  function openFileChoose () {
    inputFileRef.current.click()
  }
  function fileChange () {
    FileListRef.current= []
    let files = inputFileRef.current.files
    if (!files) return;
    const rawFiles = [...files]
    console.log(rawFiles);
    for (let i = 0; i < rawFiles.length; i++) {
      const item = rawFiles[i];
      // 增加了文件
      const packFile = changed(item)
      changeList([...FileListRef.current, packFile])
      uploadFile(packFile)
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

  function uploadFile(packFile) {
    if (!beforeUpload) {
        post(packFile)
      return
    }
    const before = beforeUpload()
    if (before && before.then) {
      before.then()
    } else if (before !== false) {
      return post(packFile)
    } else {
      return
    }
  }
  function post (packFile) {
    const options = {
      data,
      name,
      withCredentials,
      action,
      headers,
      file: packFile,
      onProgress: (e, options) => {
        let currentFileList = FileListRef.current
        let fileIndex = getFile(FileListRef.current, options.file, 'uid')
        options.file.progress = e.percent
        options.file.status = 'uploading'
        currentFileList.splice(fileIndex, 1, options.file)
        changeList(currentFileList)
        onProgress(e, options);
      },
      onSuccess: (e, options) => {
        let currentFileList = FileListRef.current
        let fileIndex = getFile(FileListRef.current, options.file, 'uid')
        options.file.progress = 100
        options.file.status = 'success'
        currentFileList.splice(fileIndex, 1, options.file)
        changeList(currentFileList)
        onSuccess(e, options);
      },
      onError: (err, options) => {
        let currentFileList = FileListRef.current
        let fileIndex = getFile(FileListRef.current, options.file, 'uid')
        options.file.progress = 100
        options.file.status = 'fail'
        currentFileList.splice(fileIndex, 1, options.file)
        changeList(currentFileList)
        onError(err, options);
      }
    }
    customRequest(options)
  }
  function onRemoveHander (item, i) {
    if (i!= null) {
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