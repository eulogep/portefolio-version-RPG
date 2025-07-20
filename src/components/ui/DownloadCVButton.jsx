import React from 'react';

const DownloadCVButton = () => (
  <a
    href="/cv.pdf"
    download
    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Télécharger mon CV
  </a>
);

export default DownloadCVButton; 