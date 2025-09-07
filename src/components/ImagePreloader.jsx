import { useEffect } from 'react';

const ImagePreloader = ({ images, priority = [] }) => {
  useEffect(() => {
    // Preload priority images first
    priority.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Add high priority hint for LCP image
      img.fetchPriority = 'high';
    });

    // Preload remaining images with lower priority
    const remainingImages = images.filter(src => !priority.includes(src));
    remainingImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.fetchPriority = 'low';
      img.loading = 'lazy';
    });
  }, [images, priority]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
