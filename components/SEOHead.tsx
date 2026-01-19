import React from 'react';

// SEOHead is now handled by Next.js metadata API in app/layout.tsx
// This component is kept for backward compatibility but does nothing
interface SEOHeadProps {
  metadata?: any;
}

const SEOHead: React.FC<SEOHeadProps> = () => {
  return null;
};

export default SEOHead;
