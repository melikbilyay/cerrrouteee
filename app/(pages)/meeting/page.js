"use client";

import dynamic from "next/dynamic";

const MeetingPage = () => {
  const MeetingAppContainer = dynamic(
    () => import("../../live/containers/MeetingAppContainer"),
    {
      ssr: false,
    }
  );

  return <MeetingAppContainer />;
};

export default MeetingPage;
