import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from '../icon'
import cls from "classnames";

function List(props) {
  const { list, prefixCls, onRemove, ...attr } = props
  const [listShowTag, setShowTag] = useState([])

  let changeShow = useCallback((i, bool) => {
    listShowTag[i] = bool
    setShowTag([...listShowTag])
  }, [listShowTag])
  useEffect(() => {
    if (list.length) {
      let ShowTagArr = []
      ShowTagArr.length = list.length
      setShowTag(ShowTagArr.fill(false))
    }
  }, [list])
  return (
    <ul className={cls(`${prefixCls}-ul`)} {...attr}>
      {list.map((item, i) => {
        return (
          <li onMouseEnter={() => { changeShow(i, true) }} onMouseLeave={() => { changeShow(i, false) }} key={i} className={cls(`${prefixCls}-li`)} >
            <div className={cls(`${prefixCls}-li-name`)}>
              {item.fileName}
            </div>
            <div className={cls(`${prefixCls}-li-icon`)}>
              {
                (item.status === 'success' && listShowTag[i] === false && <AiOutlineCheckCircle className="uploadSuccess" />) ||
                (item.status === 'fail' && listShowTag[i] === false && <AiOutlineCheckCircle className="uploadFail" />) ||
                (item.status === 'uploading' && listShowTag[i] === false && <AiOutlineClockCircle className="uploadind" />)}
              {listShowTag[i] && <AiOutlineCloseCircle className="deletedIcon" onClick={()=>{console.log('deleted');
              onRemove && onRemove(item, i)}} />}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
export default React.memo(List)