import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../api';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handle tag input
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Handle image upload to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setImageUrl(res.secure_url);
          setSuccess('Image uploaded!');
        } else {
          setError('Image upload failed.');
        }
      };
      xhr.onerror = () => {
        setIsUploading(false);
        setError('Image upload failed.');
      };
      xhr.send(formData);
    } catch {
      setIsUploading(false);
      setError('Image upload failed.');
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    if (isUploading) {
      setError('Please wait for the image to finish uploading.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a question.');
      return;
    }
    const questionData = {
      title,
      description,
      tags,
      image: imageUrl,
    };
    try {
      await createQuestion(questionData, token);
      setSuccess('Question added! Redirecting...');
      setTimeout(() => navigate('/home'), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add question.');
    }
  };

  return (
    <div className="relative max-w-xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* Auth Buttons */}
      <div className="absolute top-4 right-6 flex gap-2">
        {!isAuthenticated ? (
          <>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-white">Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-200">Title</label>
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter your question title"
          required
        />
        <label className="block mb-2 text-gray-200">Description</label>
        <textarea
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none min-h-[120px]"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your question in detail (supports markdown or HTML)"
          required
        />
        <label className="block mb-2 text-gray-200">Tags</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs flex items-center">
              {tag}
              <button type="button" className="ml-1 text-gray-300 hover:text-red-400" onClick={() => removeTag(tag)}>&times;</button>
            </span>
          ))}
          <input
            className="flex-1 p-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none min-w-[80px]"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tag"
          />
        </div>
        <label className="block mb-2 text-gray-200">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="mb-2 text-gray-200"
        />
        {isUploading && (
          <div className="mb-2 text-blue-400">Uploading: {uploadProgress}%</div>
        )}
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded" className="mb-4 max-h-40 rounded" />
        )}
        {error && <div className="mb-2 text-red-400">{error}</div>}
        {success && <div className="mb-2 text-green-400">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-60"
          disabled={isUploading}
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
