import { createBrowserRouter, RouterProvider } from 'react-router';

import Main from 'pages/main';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
