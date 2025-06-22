import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ItemModal from '../components/ItemModal';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://itemhub-2.onrender.com/api/items')
      .then(res => setItems(res.data))
      .catch(err => {
        console.error('Error fetching items:', err);
        toast.error('Failed to load items');
      })
      .finally(() => setLoading(false));
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="loading-spinner"></div>
      <span className="ml-3 text-gray-600">Loading items...</span>
    </div>
  ) : (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Items Collection
        </h1>
        <p className="text-gray-600">Click on any item to view details and send enquiries</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="card overflow-hidden cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => openModal(item)}
          >
            <div className="relative h-48 overflow-hidden">
              <img src={item.coverImage} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                {item.type}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 truncate" title={item.name}>{item.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.additionalImages?.length || 0} more photos</span>
                <span className="text-blue-500">View Details →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && selectedItem && <ItemModal item={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default ViewItems;