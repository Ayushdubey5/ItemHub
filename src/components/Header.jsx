import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="glassmorphism sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ItemHub
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${isActive('/')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
                }`}
            >
              Home
            </Link>
            <Link
              to="/add-items"
              className={`font-medium transition-colors duration-300 ${isActive('/add-items')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
                }`}
            >
              Add Items
            </Link>
            <Link
              to="/view-items"
              className={`font-medium transition-colors duration-300 ${isActive('/view-items')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
                }`}
            >
              View Items
            </Link>
            <Link
              to="/src/pages/Contact.jsx"
              className={`font-medium transition-colors duration-300 ${isActive('/src/pages/Contact.jsx')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
                }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header