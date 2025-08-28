import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UseNoteContext } from '../../../Context/NoteContext';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EditNote = () => {
  const { noteDetails, currentNote, loading, error, updateNote } = useContext(UseNoteContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    name: '',
  });

  // Fetch note details on mount
  useEffect(() => {
    noteDetails(id);
  }, [id, noteDetails]);

  // Update form data when currentNote changes
  useEffect(() => {
    if (currentNote) {
      setFormData({
        title: currentNote.title || '',
        description: currentNote.description || '',
        name: currentNote.name || '',
      });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, formData);
      toast.success('Note Updated')
    } catch (error) {
      toast.error('Note Not Update')
      console.log(error)
    }
  };

  if (loading) {
    return (
      <div className="w-full h-auto py-10 px-5">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-auto py-10 px-5">
        <div className="container mx-auto text-center text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="w-full h-auto py-10 px-5">
        <div className="container mx-auto text-center">Note not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-10 px-5">
      <ToastContainer />
      <div className="container mx-auto max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Note title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              aria-label="Note description"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Author Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-label="Author name"
            />
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              aria-label="Save note changes"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;