import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


import { dbConn } from "@/lib/mongo";


export const metadata = {
  title: "Find Your Hackathon Mates - Build your team for hackathons, connect with potential teammates,make project plans together",
  description:
    "An app to find hackathon teammates,video chat with teammates,share project plans together,assign works to teammates.",
};




const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default async function RootLayout({ children }) {
  await dbConn();
  return (
    <html lang="en">
      <body>
        <Layout children={children} />
      </body>
    </html>
  );
}

