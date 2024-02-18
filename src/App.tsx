import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppPublicRouter } from "./router";
import { KorpayFormProvider } from './services/providers/studio-form-provider/studio-form-provider';
import { Toaster } from 'react-hot-toast';


export const App = (props: {
  nome?: string
}) => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <KorpayFormProvider>
          <AppPublicRouter />
        </KorpayFormProvider>
      </BrowserRouter>
      <Toaster toastOptions={{ style: { zIndex: 'initial' } }}
        position={windowSize.width < 900 ? "top-center" : "top-right"} />
    </div>
  );
}