import React, {useEffect} from "react";
import './dashboard.css'



import Aos from 'aos'
import 'aos/dist/aos.css'


const Dashboard = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="main container section">
           
            <div className="secContent grid">
                <div className="item">
                    âdadasd
                    <h1>dđsffsfd</h1>
                </div>
                <div className="item">
                    âdadasd
                </div>
                <div className="item">
                    âdadasd
                </div>
            </div>
        </section>
    )
}  
export default Dashboard