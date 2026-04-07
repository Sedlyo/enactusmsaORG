import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ContentProvider } from '@/context/ContentContext';
import RequireAuth from '@/components/RequireAuth';
import LandingPage from '@/pages/LandingPage';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));

const Loading = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
