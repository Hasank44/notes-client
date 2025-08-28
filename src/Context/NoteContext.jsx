import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const UseNoteContext = createContext();

const NoteContext = ({ children }) => {
  const [allNotes, setAllNotes] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notes
  useEffect(() => {
    const controller = new AbortController();
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/note', {
          signal: controller.signal,
        });
        if (!response.data.notes) {
          throw new Error('Unexpected API response: notes not found');
        }
        setAllNotes(response.data.notes);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error('Error fetching notes:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
    return () => controller.abort();
  }, []);

  // Fetch single note
  const noteDetails = useCallback(async (noteId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:3000/note/${noteId}`);
      if (!response.data.finded) {
        throw new Error('Unexpected API response: note not found');
      }
      setCurrentNote(response.data.finded);
      return response.data.finded;
    } catch (error) {
      console.error('Error fetching note:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete note
  const deleteNote = useCallback(async (noteId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`http://localhost:3000/note/${noteId}`);
      setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update note
  const updateNote = useCallback(async (noteId, updatedNote) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`http://localhost:3000/note/${noteId}`, updatedNote);
      if (!response.data.updated) {
        throw new Error('Unexpected API response: note not found');
      }
      console.log(response)
      // Update allNotes to reflect the updated note
      setAllNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === noteId ? response.data.updated : note))
      );
      setCurrentNote(response.data.updated);
      return response.data.updated;
    } catch (error) {
      console.error('Error updating note:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      allNotes,
      loading,
      error,
      noteDetails,
      currentNote,
      deleteNote,
      updateNote,
    }),
    [allNotes, loading, error, noteDetails, currentNote, deleteNote, updateNote]
  );

  return <UseNoteContext.Provider value={values}>{children}</UseNoteContext.Provider>;
};

export default NoteContext;