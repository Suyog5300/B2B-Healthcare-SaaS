import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppProviders } from './providers';

const App = () => (
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>
);

export default App;