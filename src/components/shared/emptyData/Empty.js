import React from 'react'
import classes from './Empty.module.scss'
import {ImFilesEmpty} from 'react-icons/im'
export default function Empty() {
  return (
    <div className={`row ${classes.divEmpty}`}>
        <ImFilesEmpty className={`${classes.emptyIcon} text-center`} />
     <p style={{opacity:.6}} className="text-dark text-center fs-3 pt-5">No results found</p>
    </div>
  )
}
