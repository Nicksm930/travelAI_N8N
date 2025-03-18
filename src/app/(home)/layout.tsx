import React from 'react'

const HomeLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <header className='flex flex-row p-4 justify-start'>
            <h1 className='text-2xl font-bold'>Travel AI</h1>
        </header>
        {children}
    </div>
  )
}

export default HomeLayout