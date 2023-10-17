import React from 'react'

const Notification = ({error,errorType}) => {

    if(error === null) {
        return null
    }

  return (
    <div className={errorType ? "error" : "success"}>{error}</div>
  )
}

export default Notification