import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import UploadedList from './uploadedList.js'
import Upload from './upload.js'

function getFile (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element.rawFile === item) {
      return{ currentFile: element , currenIndex: i}
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

function Index(props) {
  const {
    prefixCls,
    drag,
    showFileList,
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
  const FileListRef = useRef([])
  const [refalsh, setRefalsh] = useState(0)

  function fileAdd (files) {
    if (!files) return;
    console.log(files);
    // 增加了文件
    const packFile = changed(files)
    changeList([...FileListRef.current, packFile])
  }

  function changeList (arr) {
    FileListRef.current = arr
    setRefalsh(refalsh=>refalsh+1)
    if(onChange) {
      console.log('onChange');
      onChange(FileListRef.current)
    }
  }

  function handleSuccess(e, rawFile) {
    let currentFileList = FileListRef.current
    let fileIndex = getFile(FileListRef.current, rawFile)
    options.file.progress = 100
    options.file.status = 'success'
    currentFileList.splice(fileIndex, 1, options.file)
    changeList(currentFileList)
    onSuccess && onSuccess(e, options)
  }
  function handleProgress(e, rawFile) {
    let currentFileList = FileListRef.current
    let {currentFile, currenIndex} = getFile(FileListRef.current, rawFile)
    currentFile.progress = e.percent
    currentFile.status = 'uploading'
    currentFileList.splice(currenIndex, 1, currentFile)
    changeList(currentFileList)
    onProgress && onProgress(e, currentFile);
  }
  function handleError(e, rawFile) {
    let currentFileList = FileListRef.current
    let {currentFile, currenIndex} = getFile(FileListRef.current, rawFile)
    currentFile.progress = 100
    currentFile.status = 'fail'
    currentFileList.splice(currenIndex, 1, currentFile)
    changeList(currentFileList)
    onError && onError(e, currentFile);
  }

  function onRemoveHander (item, i) {
    if (i != null) {
      FileListRef.current.splice(i,1)
      changeList(FileListRef.current)
    }
    onRemove && onRemove(item, FileListRef.current)
  }
  return (
    <div className={cls(prefixCls,classname)}>
      <Upload {...attr}  onStart={fileAdd} onRemove={onRemoveHander} onSuccess={handleSuccess} onProgress={handleProgress} onError={handleError}>
        {children}
      </Upload>
      {showFileList && 
        <UploadedList prefixCls={prefixCls} onRemove={onRemoveHander} list={FileListRef.current} />
      }
    </div>
  )
}
Index.propTypes = {
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
Index.defaultProps = {
  prefixCls: 'one-upload',
  drag: false,
  showFileList: false,
  withCredentials: true,
  name: 'file',
  multiple: false,
  onError: function (e,options) {
    console.log('翻车原因：');
    console.log(e);
    console.log(options.fileName+'翻车');
  },
  onSuccess: function (e,options) {
    console.log(options.fileName+'成功');
  },
  onProgress: function (e,options) {
    console.log(options.fileName+'进度'+options.progress);
  },
  onChange: function (e) {
    console.log('当前文件:');
    console.log(e);
  },
}
export default React.memo(Index)

/**
 * 思路
 * upload 单纯的上传组件
 * index 封装后的组件
 * blob 转换为file对象
 * new File([Blob], File.name, {
      type: File.type
  })
 * callback 对依赖函数的包装
 */