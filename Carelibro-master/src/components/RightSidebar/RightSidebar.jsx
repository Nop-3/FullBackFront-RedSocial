import React from 'react';
import SearchFriendsCard from './SearchFriendsCard';
import FriendRequest from './FriendRequest';
import UpcomingEvents from './UpcomingEvents';
import AdsCard from './AdsCard';

export default function RightSidebar() {
  return (
    <aside className="right-sidebar-col">
      {/* Buscador y sugerencias de amigos */}
      <SearchFriendsCard />

      {/* Solicitudes de amistad recibidas */}
      <FriendRequest />

      {/* Próximos eventos */}
      <UpcomingEvents />

      {/* Publicidad */}
      <AdsCard />
    </aside>
  );
}
