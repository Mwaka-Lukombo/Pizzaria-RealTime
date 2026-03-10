import { useEffect, useState } from 'react'
import {Loader} from 'lucide-react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { authStore } from './store/authStore'
import { Toaster } from 'react-hot-toast';
import { NavBar } from './components/NavBar';


import { HomePage } from './pages/HomePage';
import { ProductSingle } from './pages/ProductSingle';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { SignPage } from './pages/SignPage';
import { ProfilePage } from './pages/ProfilePage';
import { KitchenPage } from './pages/KitchenPage';
import { OrdersPage } from './components/OrdersPage';




function App() {
    const {userAuth,check,isCheking,theme} = authStore();

    useEffect(()=>{
      check();
    },[check]);

    if(isCheking){
      return <div className='min-h-screen w-full bg-black/85 flex items-center justify-center'>
          <Loader className="size-10 animate-spin text-white" />
      </div>
    }

  return (
    <>
     <div data-theme={theme} className='min-h-screen w-full'>
        {userAuth && (
          <NavBar />
        )}
        <Routes>
           <Route path='/' element={userAuth ? <HomePage /> : <Navigate to='/login' />} />
           <Route path='/login' element={!userAuth ? <LoginPage /> : <Navigate to='/' />} />
           <Route path='/sign' element={!userAuth ? <SignPage /> : <Navigate to="/" />} />
           <Route path='/profile' element={userAuth ? <ProfilePage /> : <Navigate to='/login' />} />
           <Route path='/orders' element={userAuth ? <OrdersPage /> : <Navigate to='/login' />} />
           <Route path='/admin' element={userAuth ? <AdminPage /> : <Navigate to='/login' />} />
           <Route path='/kitchen' element={userAuth ? <KitchenPage /> : <Navigate to="/login" />} />
           <Route path='/product/:id' element={userAuth ? <ProductSingle /> : <Navigate to='/login' />} />
        </Routes>
     </div>
     <Toaster />
    </>
  )
}

export default App
