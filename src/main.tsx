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
import Profile from './routes/Profile.tsx'
import UserSchedules from './routes/UserSchedules.tsx'
import CreateSchedule from './routes/CreateSchedule.tsx'
import UserCreatedSchedules from './routes/UserCreatedSchedules.tsx'
import { ProtectedRoute } from './Utils/ProtectedRoute.tsx'
import { IsLogged } from './Utils/IsLogged.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element:
          <IsLogged>
            <Home />
          </IsLogged>
      },
      {
        path: "/register",
        element:
          <IsLogged>
            <Register />
          </IsLogged>
      },
      {
        path: "/login",
        element:
          <IsLogged>
            <Login />
          </IsLogged>
      },
      {
        path: "/schedules",
        element:
          <ProtectedRoute>
            <Schedules />
          </ProtectedRoute>
      },
      {
        path: "/scheduleDetails",
        element:
          <ProtectedRoute>
            <ScheduleDetails />
          </ProtectedRoute>
      },
      {
        path: "/profile",
        element:
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
      },
      {
        path: "/userSchedules",
        element:
          <ProtectedRoute>
            <UserSchedules />
          </ProtectedRoute>
      },
      {
        path: "/createSchedule",
        element:
          <ProtectedRoute>
            <CreateSchedule />
          </ProtectedRoute>
      },
      {
        path: "/userCreatedSchedules",
        element:
          <ProtectedRoute>
            <UserCreatedSchedules />
          </ProtectedRoute>
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
