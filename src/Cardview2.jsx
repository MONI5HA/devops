import React from 'react'
import bgc from './bg.png'

function Cardview2({data}) {
  return (
    <div className='flex flex-col  drop-shadow-md w-[500px] h-[500px] p-20 justify-center items-center '       
    style={{ backgroundImage: `url(${bgc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
<h3 className='font-serif font-bold text-[40px] ml-10'>Usage </h3>
        <p className='font-serif font-normal text-[20px] p-10 ml-24' >{data}</p>
        
    </div>
  )
}

export default Cardview2;