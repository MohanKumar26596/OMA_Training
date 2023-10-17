import React from 'react'
import BodyLogo from '../assets/images/BodyLogo.png'
import BodyAppLogo from '../assets/images/BodyAppLogo.png'
import '../casecading/StartTest.css'
import { Link } from 'react-router-dom'
import Header from '../reusableComponents/Header'

function StartTest() {
    return (
        <div className='start-Test'>
            
            <Header />

            <div className='header-Down'>
                <div className='center-content'>
                    <img src={BodyLogo} className='body-Logo' />
                    <Link to={"/Instruction"} className='body-Btn'>Start Assesment</Link> 
                </div>
                <div className='center-App'>
                    <img src={BodyAppLogo} className='body-AppLogo' />
                </div>
            </div>
        </div>
    )
}

export default StartTest
