import React from 'react'

const Loader = () => {
  return (
    <div className='fixed top-5 left-1/2 -translate-y-1/2 bg-orange-400 rounded-b-sm'>
        <p className='px-5 py-3 text-xl text-neutral-800'>Loading...</p>
    </div>
  )
}

export default Loader