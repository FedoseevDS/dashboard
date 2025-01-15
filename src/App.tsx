import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Main from 'pages/main';

import store from './store';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
