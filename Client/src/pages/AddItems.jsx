import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemTypes = [
    'Electronics', 'Clothing', 'Books', 'Home & Garden',
    'Sports', 'Toys', 'Automotive', 'Other',
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    setAdditionalImages(Array.from(e.target.files));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'unsigned_preset');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/doyvzoprv/image/upload',
        data
      );
      return res.data.secure_url;
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error.response?.data || error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.description || !coverImage) {
      toast.error('Please fill all required fields and select a cover image');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Adding item...');

    try {
      const coverImageUrl = await uploadToCloudinary(coverImage);

      const additionalImageUrls = [];
      for (const image of additionalImages) {
        const url = await uploadToCloudinary(image);
        additionalImageUrls.push(url);
      }

      // ✅ Updated API endpoint
      await axios.post('https://itemhub-2.onrender.com/api/items', {
        ...formData,
        coverImage: coverImageUrl,
        additionalImages: additionalImageUrls,
      });

      toast.success('Item successfully added!', { id: toastId });

      setFormData({ name: '', type: '', description: '' });
      setCoverImage(null);
      setAdditionalImages([]);
      document.getElementById('coverImage').value = '';
      document.getElementById('additionalImages').value = '';

    } catch (error) {
      console.error('❌ Error adding item:', error);
      toast.error('Failed to add item. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add New Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter item name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="input-field"
              disabled={loading}
            >
              <option value="">Select item type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe your item in detail"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image *
            </label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="input-field"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              This will be the main image displayed for your item
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (Optional)
            </label>
            <input
              type="file"
              id="additionalImages"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              className="input-field"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload multiple images to showcase your item better
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-3"></div>
                Adding Item...
              </div>
            ) : (
              'Add Item'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
