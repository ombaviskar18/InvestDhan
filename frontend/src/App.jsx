import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Business from './components/Business'
import Browse from './components/Browse'
import Profile from './components/Profile'
import BusinessDescription from './components/BusinessDescription'
import Businesses from './components/admin/Businesses'
import BusinessCreate from './components/admin/BusinessCreate'
import BusinessSetup from './components/admin/BusinessSetup'
import Businessinfos from './components/admin/Businessinfos'
import PostBusinessinfo from './components/admin/PostBusinessinfo'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/> 
},
{
  path:'/signup',
  element:<Signup/>
},
{
  path:'/business',
  element:<Business/>
},
{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/description/:id',
  element:<BusinessDescription/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/admin/businesses',
  element:<ProtectedRoute><Businesses/></ProtectedRoute> 
},
{
  path:'/admin/businesses/create',
  element:<BusinessCreate/>
},
{
  path:'/admin/businesses/:id',
  element:<BusinessSetup/>
},
{
  path:'/admin/businessinfos/',
  element:<Businessinfos/>
},
{
  path:'/admin/businessinfos/create',
  element:<PostBusinessinfo/>
},
{
  path:'/admin/businessinfos/:id/applicants',
  element:<Applicants/>
},
])

function App() {
  

  return (
    <div className='bg-gray-900'>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
