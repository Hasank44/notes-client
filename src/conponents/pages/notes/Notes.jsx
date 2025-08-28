import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseNoteContext } from '../../../Context/NoteContext';
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Notes = () => {
  const { loading, allNotes, error, deleteNote } = useContext(UseNoteContext);
  const navigate = useNavigate()
  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      toast.success('Note Delete Success')
      setTimeout(() => {
            navigate('/');
        }, [5000]);
    } catch (error) {
      console.error('Failed to delete note:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-auto py-10 px-5">
        <div className="container mx-auto text-center">Loading...</div>
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

  if (!allNotes || allNotes.length === 0) {
    return (
      <div className="w-full h-auto py-10 px-5">
        <div className="container mx-auto text-center">No notes found.</div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-10 px-5">
      <ToastContainer />
      <div className="container mx-auto w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allNotes.map((note) => (
          <div
            key={note._id}
            className="bg-gray-400 rounded-md px-3 py-3 space-y-3 flex flex-col justify-center items-center"
          >
            <h3 className="text-center text-2xl text-blue-800 font-bold">{note.title}</h3>
            <p className="text-left">{note.description}</p>
            <div className="flex justify-between px-5 w-full">
              <span className="text-[20px] text-amber-900">{note.name}</span>
              <span className="flex gap-2">
                <Link
                  to={`/edit/${note._id}`}
                  className="px-3 py-1 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm"
                  aria-label={`Edit note ${note.title}`}
                >
                  Edit
                </Link>
                <button
                  aria-label={`Delete note ${note.title}`}
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;