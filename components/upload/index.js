import React, { useState, useEffect, useRef } from "react";
import PropTypes, { func } from "prop-types";
import cls from "classnames";

function getError(action, option, xhr) {
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
  if(options.onError) ajax.onerror = function (e) {
    options.onError(e);
  }
  ajax.onload = function onload() {
    if (ajax.status < 200 || ajax.status >= 300) {
      return options.onError(getError(options.action, options, ajax));
    }

    options.onSuccess(getBody(ajax), options);
  };
  ajax.open('post', options.action, true)
  ajax.withCredentials = options.withCredentials
  ajax.send(postData)
  return ajax
}
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
  function openFileChoose () {
    inputFileRef.current.click()
  }
  function fileChange () {
    let files = inputFileRef.current.files
    if (!files) return;
    const rawFiles = [...files]
    console.log(rawFiles);
    onChange && onChange({files: rawFiles, type: 'add'})
    for (let i = 0; i < rawFiles.length; i++) {
      const item = rawFiles[i];
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
      before.then()
    } else if (before !== false) {

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
      onProgress: e => {
        onProgress(e, rawFile);
      },
      onSuccess: res => {
        onSuccess(res, rawFile);
      },
      onError: err => {
        onError(err, rawFile);
      }
    }
    customRequest(options)
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
  onError: function () {},
  onSuccess: function () {},
  onProgress: function () {},
}
export default React.memo(Upload)