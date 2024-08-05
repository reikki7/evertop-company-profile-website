import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-gray-100 flex flex-col items-center justify-center w-full py-4 text-[#042f12]'>
            <div className='text-center'>
                &copy; {currentYear} PT. Poli Material Indonesia. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
