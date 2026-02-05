import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthInit } from './components/auth/AuthInit';
import { router } from './router';

function App() {
  return (
    <>
      <AuthInit>
        <RouterProvider router={router} />
      </AuthInit>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
