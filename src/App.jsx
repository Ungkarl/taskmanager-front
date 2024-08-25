import { useRoutes } from 'react-router-dom'
import './App.css'
import SignInPage from './pages/signIn/SignInPage'
import ManagementPage from './pages/management/ManagementPage'
import Dashboard from './components/management/dashboard/dashboard'
import { useLocation } from 'react-router-dom'
import Users from './components/management/users/users'
import DeleteUser from './components/management/users/deleteUser/DeleteUser'
import AddUser from './components/management/users/addUser/AddUser'
import EditUser from './components/management/users/editUser/EditUser'

import Tasks from './components/management/tasks/tasks'
import AddTask from './components/management/tasks/addTask/AddTask'
function App() {
  const location = useLocation();
  const isManagementPath = location.pathname.includes('management');

  const routes = useRoutes([
    {
      path: '/',
      element: <div>HOME</div>
    },
    {
      path: '/management',
      element: <ManagementPage />,
      children: [
        {
          path: '/management/signin',
          element:  <SignInPage />
        },
        {
          path: '/management/dashboard',
          element: <Dashboard />

        },
        {
          path: '/management/users',
          element: <Users />,
          children: [
            {
              path: '/management/users/add',
              element: <AddUser />
            },
            {
              path: '/management/users/delete/:id',
              element: <DeleteUser />

            },
            {
              path: '/management/users/edit/:id',
              element: <EditUser />
            }
          ]
        },
        {
          path: '/management/tasks',
          element: <Tasks />,
          children: [
            {
              path: '/management/tasks/add',
              element: <AddTask />
            }
          ]
        }

      ]
    }
  ])

  
  if (useLocation().pathname.includes('management')) {

  }


  return (
    <div className="content-center-page">
      {!isManagementPath && <div>NAVIGATION</div>}
      <div className="main-content">{routes}</div>
      {!isManagementPath && <div>FOOTER</div>}
    </div>
  )
}

export default App
