import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { dbConn } from "@/lib/mongo";

export const metadata = {
  title: "Find Your Hackathon Mates - Build your team for hackathons, connect with potential teammates,make project plans together",
  description:
    "An interactive learning app that lets students create personalized study plans, level up through gamified quizzes, and earn rewards for their progress",
};

const Layout = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default async function RootLayout({ children }) {
  await dbConn();
  return (
    <html lang="en">
      <body>
        <Layout />
        {children}
      </body>
    </html>
  );
}
