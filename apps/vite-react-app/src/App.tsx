// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
// Import your layouts/components
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Toaster } from "@workspace/ui/components/sonner";
import { ANPRPage } from '@/pages/ANPRPage';


function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <TooltipProvider>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Toaster />
              <Routes>
                <Route path="/" element={<ANPRPage />} />
                <Route path="/anpr" element={<ANPRPage />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </TooltipProvider>
      </Provider>
    </HelmetProvider >
  );
}

export default App;