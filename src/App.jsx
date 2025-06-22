import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import AddItems from './pages/AddItems'
import ViewItems from './pages/ViewItems'
import Home from './pages/Home'
import Contact from './pages/Contact' // ✅ Add this line

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-items" element={<AddItems />} />
            <Route path="/view-items" element={<ViewItems />} />
            <Route path="/src/pages/Contact.jsx" element={<Contact />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
