import React from 'react'

const Loader = () => {
  return (
   
        <div className="flex space-x-4">
          <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce delay-300"></div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce delay-150"></div>
        </div>
    
  )
}

export default Loader
