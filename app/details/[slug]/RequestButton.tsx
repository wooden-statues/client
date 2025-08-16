"use client";

import Link from "next/link";

export default function RequestButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const handleClick = () => {
    try {
      localStorage.setItem("item", title);
    } catch {
      // тихо игнорирай (например private mode)
    }
  };

  return (
    <Link href="/requests" onClick={handleClick} className={className}>
      Направи заявка
    </Link>
  );
}
