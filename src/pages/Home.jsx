import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to ItemHub
        </h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Your ultimate solution for managing items with ease. Add, view, and manage your inventory 
          with our beautiful and intuitive interface. Upload images, send enquiries, and keep track 
          of everything in one place.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-8 animate-slide-up">
            <div className="text-blue-500 text-4xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold mb-4">Add Items</h3>
            <p className="text-gray-600 mb-6">
              Easily add new items with detailed information, cover images, and additional photos. 
              All images are automatically uploaded to the cloud for secure storage.
            </p>
            <Link to="/add-items" className="btn-primary inline-block">
              Start Adding Items
            </Link>
          </div>
          
          <div className="card p-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-purple-500 text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-semibold mb-4">View Items</h3>
            <p className="text-gray-600 mb-6">
              Browse through your items collection with beautiful cards and detailed modals. 
              View all images in an elegant carousel and send enquiries directly.
            </p>
            <Link to="/view-items" className="btn-primary inline-block">
              Explore Items
            </Link>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">☁️</div>
              <h4 className="font-semibold mb-2">Cloud Storage</h4>
              <p className="text-sm text-gray-600">Images stored securely on Cloudinary</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold mb-2">Email Integration</h4>
              <p className="text-sm text-gray-600">Send enquiries directly via email</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold mb-2">Responsive Design</h4>
              <p className="text-sm text-gray-600">Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home