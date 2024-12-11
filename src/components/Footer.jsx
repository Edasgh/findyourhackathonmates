"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full text-center poppins-light py-2 bg-footerBg text-textPrimary">
      Copyright &copy; 2024 Find Your Hackathon Mates | Made with ❤️ by &nbsp;
      <Link href="https://github.com/Edasgh" target="_blank">
        Eshita Das
      </Link>
    </footer>
  );
}
