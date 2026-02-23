import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { listRegionsLoader } from './loader';
import FilterPage from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader: listRegionsLoader,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
