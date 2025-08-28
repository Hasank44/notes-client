import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const AddNote = () => {
  const [formObj, setFormObj] = useState({
    title: "",
    description: "",
    author: ""
  });

  const inputOnChange = (property, value) => {
    setFormObj(prevObj => ({
      ...prevObj,
      [property]: value
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/note', formObj);
      toast.success('Note added successfully');
      // Reset form after successful submission
      setFormObj({
        title: "",
        description: "",
        author: ""
      });
    } catch (err) {
      toast.error(`Error adding note: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Add Note</h1>
      <form onSubmit={submitData} className="space-y-2 max-w-5xl">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            onChange={(e) => inputOnChange('title', e.target.value)}
            value={formObj.title}
            type="text"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            onChange={(e) => inputOnChange('description', e.target.value)}
            value={formObj.description}
            type="text"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Author Name</label>
          <input
            onChange={(e) => inputOnChange('author', e.target.value)}
            value={formObj.author}
            type="text"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;