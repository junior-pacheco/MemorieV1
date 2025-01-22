import React from 'react'
import QRScanner from '../pages/QRScanner';

const Home = () => (
  <div className="flex min-h-screen">
    <div className="h-[97vh]">
      <QRScanner />
    </div>
  </div>
);

export default Home;
