import React from 'react'
import { MdCropSquare } from 'react-icons/md'
import { RiStarLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Message = () => {
  return (
    <Link to={'/mail/123456789'} className='flex items-start justify-between border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
        <div className='flex items-center gap-3'>
            <div className='flex-none text-gray-500'>
                <MdCropSquare className='w-5 h-5'/>
            </div>
            <div className='flex-none text-gray-500'>
                <RiStarLine className='w-5 h-5'/>
            </div>
        </div>
        <div className='flex-1 ml-4'>
            <p className='text-gray-700 inline-block max-w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odio nulla ullam excepturi unde illo ab? Autem ad expedita sit placeat architecto soluta odio sunt?</p>
        </div>
        <div className='flex-none text-gray-500 text-sm'>
            12:00 AM
        </div>
    </Link>
  )
}

export default Message