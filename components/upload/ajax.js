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
  err.method = "post";
  err.url = action;
  return err;
}

function getBody(ajax) {
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
function Ajax(options) {
  let postData = new FormData();
  postData.append(options.name, options.file);
  if (options.data) {
    Object.keys(options.data).forEach(key => {
      postData.append(key, options.data[key]);
    });
  }

  let ajax = new XMLHttpRequest();
  const headers = options.headers || {};
  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      ajax.setRequestHeader(item, headers[item]);
    }
  }
  if (options.onProgress && ajax.upload) {
    ajax.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      options.onProgress(e, options);
    };
  }

  if (options.onError) {
    ajax.onerror = function(e) {
      options.onError(e, options);
    };
  }
  ajax.onload = function onload() {
    if (ajax.status < 200 || ajax.status >= 300) {
      return options.onError(getError(options.action, ajax), options);
    }

    options.onSuccess(getBody(ajax), options);
  };
  ajax.open("post", options.action, true);
  ajax.withCredentials = options.withCredentials;
  ajax.send(postData);
  return ajax;
}
export default Ajax