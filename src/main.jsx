import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import EditNote from './conponents/pages/editNote/EditNote.jsx'
import AddNote from './conponents/pages/addNote/AddNote.jsx'
import Notes from './conponents/pages/notes/Notes.jsx'
import NoteContext from './Context/NoteContext.jsx'
const router = createBrowserRouter([
    {
      path:'/',
      element: <App />,
      children:[
        { index: true, path:'/', element: <Notes />},
        { path:'/edit/:id' , element: <EditNote />},
        { path:'/add', element: <AddNote />}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteContext>
      <RouterProvider router={router}>
      </RouterProvider>
    </NoteContext>
  </StrictMode>,
)
