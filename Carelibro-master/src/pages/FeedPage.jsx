import React from 'react';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import Feed from '../components/Feed/Feed';
import RightSidebar from '../components/RightSidebar/RightSidebar';

export default function FeedPage() {
  return (
    <main className="main-layout-container" style={{ padding: '0 16px', maxWidth: '1440px', margin: '20px auto 40px auto' }}>
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </main>
  );
}
