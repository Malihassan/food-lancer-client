import React from 'react'
import classes from './Empty.module.scss'
import {ImFilesEmpty} from 'react-icons/im'
export default function Empty(props) {
  return (
    <div className={`d-flex flex-column justify-content-start align-items-center ${classes.divEmpty}`}>
        <ImFilesEmpty className={`${classes.emptyIcon}`} />
     <p style={{opacity:.6}} className="text-dark text-center fs-3 pt-5">{props.message}</p>
    </div>
  )
}
