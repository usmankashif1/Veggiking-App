import React from 'react';
import ContentLoader, { Rect } from 'react-native-content-loader/native'; // Use native for React Native projects

const Loader = () => (
  <ContentLoader 
    speed={1}
    width={300}  // Adjust width as needed
    height={160}  // Adjust height as needed
    viewBox="0 0 400 160"
    backgroundColor="#f0f0f0"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="10" ry="10" width="100%" height="190" />  {/* Image */}
    <Rect x="0" y="200" rx="4" ry="4" width="100%" height="24" />   {/* Title */}
    <Rect x="0" y="230" rx="4" ry="4" width="40%" height="20" />    {/* Price */}
    <Rect x="0" y="260" rx="4" ry="4" width="100%" height="80" />    {/* Description */}
  </ContentLoader>
);

export default Loader;
