import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
    return(
        <>
          <Header/>
          <div className='mt-4 mb-4'><Outlet/></div>
          
          <Footer/>
        </>
    )
}

export default ClientLayout