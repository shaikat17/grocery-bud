import React, { useEffect } from 'react'

const Alert = (props) => {
  const {type, msg} = props.alt
  useEffect(() => {
    const timeOut = setTimeout(() => {
      props.removeAlert()
    }, 3000);
    return () => clearTimeout(timeOut)
  },[props.list])
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert