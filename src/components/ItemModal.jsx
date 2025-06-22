import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ItemModal = ({ item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [enquireForm, setEnquireForm] = useState({
    userEmail: '',
    userMessage: ''
  })
  const [showEnquireForm, setShowEnquireForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const allImages = [item.coverImage, ...(item.additionalImages || [])]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleEnquireSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading('Sending enquiry...')

    try {
      await axios.post('/api/enquire', {
        itemId: item._id,
        itemName: item.name,
        userEmail: enquireForm.userEmail,
        userMessage: enquireForm.userMessage
      })

      toast.success('Enquiry sent successfully!', { id: toastId })
      setShowEnquireForm(false)
      setEnquireForm({ userEmail: '', userMessage: '' })
    } catch (error) {
      console.error('Error sending enquiry:', error)
      toast.error('Failed to send enquiry. Please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e) => {
    setEnquireForm({
      ...enquireForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative mb-6">
            <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Item Type</h3>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.type}
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Added: {new Date(item.createdAt).toLocaleDateString()}</p>
                <p>Total Images: {allImages.length}</p>
              </div>
            </div>

            <div>
              {!showEnquireForm ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Interested in this item?</h3>
                  <p className="text-gray-600 mb-6">
                    Send an enquiry to get more information about this item.
                  </p>
                  <button
                    onClick={() => setShowEnquireForm(true)}
                    className="btn-primary w-full"
                  >
                    Send Enquiry
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Send Enquiry</h3>
                  <form onSubmit={handleEnquireSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="userEmail"
                        value={enquireForm.userEmail}
                        onChange={handleFormChange}
                        className="input-field"
                        placeholder="your.email@example.com"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        name="userMessage"
                        value={enquireForm.userMessage}
                        onChange={handleFormChange}
                        rows={3}
                        className="input-field resize-none"
                        placeholder="Add any specific questions or comments..."
                        disabled={loading}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn-primary flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? 'Sending...' : 'Send Enquiry'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEnquireForm(false)}
                        className="btn-secondary"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemModal