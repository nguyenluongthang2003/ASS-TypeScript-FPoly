import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <div className='main'>
        <header>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer className='footer'>
        <span>Luongthang</span>
        </footer>
    </div>
  )
}

export default AdminLayout