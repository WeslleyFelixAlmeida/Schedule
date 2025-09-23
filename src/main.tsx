import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './routes/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './routes/Register.tsx'
import Login from './routes/Login.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import App from './App.tsx'
import Schedules from './routes/Schedules.tsx'
import ScheduleDetails from './routes/ScheduleDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/schedules",
        element: <Schedules/>
      },
      {
        path: "/scheduleDetails",
        element: <ScheduleDetails/>
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
