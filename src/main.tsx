import React from 'react';
import ReactDOM from 'react-dom/client';
import ImageGallery from './ImageGallery';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImageGallery imageUrls={[]} height={150} />
  </React.StrictMode>,
);
