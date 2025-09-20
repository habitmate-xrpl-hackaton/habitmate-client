"use client";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Not logged in</p>;

  return (
    <div>
      <h2>사용자 정보</h2>
      <p>이름: {session?.user?.name}</p>
      <p>이메일: {session?.user?.email}</p>
      <p>이미지: {session?.user?.image}</p>
    </div>
  );
}
