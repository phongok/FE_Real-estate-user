import React, {useEffect} from "react";
import './dashboard.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Dashboard = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="">
           
            <div className="secContentDB grid">
                <div data-aos="fade-right" className="model-total-user">
                    âdadasd
                    <h1>dđsffsfd</h1>
                </div>

                <div data-aos="fade-down" className="model-total-home">
                    âdadasd
                    <h1>dđsffsfd</h1>
                </div>

                

                <div data-aos="fade-up" className="model-total-typebusiness">
                    âdadasd
                    <h1>dđsffsfd</h1>
                </div>

                <div data-aos="fade-left" className="model-total-revenue">
                    âdadasd
                    <h1>dđsffsfd</h1>
                </div>
                
               
            </div>
        </section>
    )
}  
export default Dashboard