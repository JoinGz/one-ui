import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import UploadedList from './uploadedList.js'
import Upload from './upload.js'


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
  const FileListRef = useRef([])
  const [refalsh, setRefalsh] = useState(0)

  function fileChange (files) {
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



  function onRemoveHander (item, i) {
    if (i != null) {
      FileListRef.current.splice(i,1)
      changeList(FileListRef.current)
    }
    onRemove && onRemove(item, FileListRef.current)
  }
  return (
    <div className={cls(prefixCls,classname)}  {...attr}>
      <Upload onStart={fileChange} onChange={fileChange} onRemove={onRemoveHander} onSuccess={} onProgress={} onError={}></Upload>
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
export default React.memo(Index)