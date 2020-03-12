import React, { useState, useEffect, useRef } from "react";
import PropTypes, { func } from "prop-types";
import cls from "classnames";

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
    ...attr
  } = props
  const inputFileRef = useRef()
  function openFileChoose () {
    inputFileRef.current.click()
  }
  function fileChange () {
    let files = inputFileRef.current.files
    console.log(files);
    onChange && onChange({files, type: 'add'})
    beforeUpload && beforeUpload()
    files.forEach((item, i) => {
      
    });
  }
  useEffect(()=>{
    
  }, [])
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
}
Upload.defaultProps = {
  prefixCls: 'one-upload',
  drag: false,
  showFileList: false,
  withCredentials: true,
  name: 'file',
  multiple: false,
}
export default React.memo(Upload)