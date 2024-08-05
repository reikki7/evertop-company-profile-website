import React from 'react'
import CompanyIcon from "../assets/CompanyIcon.jpg"

const Header = () => {
    return (
        <div className='flex justify-center my-4'>
            <img src={CompanyIcon} alt="Company Icon" style={{ width: "300px", height: "auto" }} />
        </div>
    )
}

export default Header