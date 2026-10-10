import React from 'react';
import ProfileCard from './ProfileCard';
import AccordionMenu from './AccordionMenu';
import InterestsCard from './InterestsCard';
import AlertNotice from './AlertNotice';

export default function LeftSidebar() {
  return (
    <aside className="left-sidebar-col">
      <ProfileCard />
      <AccordionMenu />
      <InterestsCard />
      <AlertNotice />
    </aside>
  );
}
