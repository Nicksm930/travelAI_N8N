import React from 'react'

const PlacesLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div>
        <h1>places layout</h1>
        {children}
    </div>
  )
}

export default PlacesLayout