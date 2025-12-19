import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ClerkProvider } from "@clerk/clerk-react";
import { ParallaxProvider } from 'react-scroll-parallax';
import { HelmetProvider } from "@vuer-ai/react-helmet-async";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in .env.local");
}

const savedTheme = localStorage.getItem('news-store-theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
} else {
  document.documentElement.classList.add('light');
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
              <HelmetProvider>
                <ParallaxProvider>

                  <App />

                </ParallaxProvider>
              </HelmetProvider>
            </ClerkProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
  </StrictMode>
);
