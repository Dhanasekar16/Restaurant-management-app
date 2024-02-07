import React from 'react'
import './HomePage.scss'
import dish from '../../Assets/Images/food-img.png'

export const HomePage = () => {
  return (
    <>
    <div className='container banner_section py-5p'>
        <div className='row'>
            <div className='col-md-6 banner_left_content align-self-center'>
                <h2 className='banner_title'>Enjoy Our <br /> Delicious Meal</h2>
                <p className='banner_desc pe-lg-5 p-0'>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
            </div>
            <div className='col-md-6 banner_right_content'>
                <img loading="lazy" className='img-fluid' src={dish} alt="dish" />
            </div>
        </div>
    </div>
    </>
  )
}
