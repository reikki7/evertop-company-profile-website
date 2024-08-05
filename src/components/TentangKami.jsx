import React from 'react'
import LogoTentang from '../assets/LogoTentang.webp'

const TentangKami = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full gap-8 py-24 text-left bg-gray-100 lg:flex-row my-14'>
            <div className="flex flex-col items-center tracking-normal">
                <div className='text-lg w-full md:w-[680px] px-4'>
                    <h2 className='text-3xl font-bold text-center md:text-left'>TENTANG <span className='text-[#0d923a]'>KAMI</span></h2>
                    <h2 className='my-2 text-4xl font-bold text-center lg:text-6xl md:text-left'>MENGHADIRKAN REVOLUSI ATAP BERKUALITAS</h2>
                    <p className='mt-4 text-center md:text-left font-helvetica'>Perusahaan kontruksi atap yang berkualitas tinggi dan menjadi no. 1 di Indonesia. Kami mengkombinasikan material berkualitas tinggi dengan tekhnologi mesin ekstrusi generasi terbaru untuk menghasilkan produk atap dengan kualitas terbaik.</p>
                </div>
            </div>
            <img src={LogoTentang} alt="" className='object-contain w-32 h-auto lg:w-72' />
        </div>
    )
}

export default TentangKami