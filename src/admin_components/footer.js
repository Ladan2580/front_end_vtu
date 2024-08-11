import React from 'react'

export default function footer() {
  return (
    <footer className='fixed bottom-0 w-full h-18 bg-slate-900 z-50 text-white text-center'>
       <div className='mt-2 font-bold text-lg'>Copywrite @ {process.env.REACT_APP_NAME} 2024</div>
      <div>Design and developed by Ladan Digital Academy</div>
    </footer>
  )
}
