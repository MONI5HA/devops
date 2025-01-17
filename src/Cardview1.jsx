import React from 'react'
import bgc from './bg.png'

function Cardview1({data}) {
  console.log(data)
  return (
    
    <div className='flex flex-col  drop-shadow-md w-[500px] h-[500px] p-20 justify-center items-center '       
    style={{ backgroundImage: `url(${bgc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
    <h3 className='font-serif font-bold text-[40px] mt-10 ml-10'>Meaning </h3>
        <h5 className='font-serif font-medium text-[30px] p-10 ml-24' >{data}
        </h5>
        
    </div>
  )
}

export default Cardview1;