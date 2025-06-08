import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton
} from "../components/Navbar.jsx";
import { cn } from "../utils/cn.js";
import TypewriterEffect from '../components/TypewriterEffect.jsx';
import Spotlight from '../components/Spotlight.jsx';
import { MaskContainer } from '../components/MaskEffect.jsx';
import { BackgroundLines } from '../components/BackgroundLines.jsx';
import {
  Home as IconHome,
  TerminalSquare as IconTerminal2,
  LayoutDashboard as IconNewSection,
  Repeat as IconExchange,
  Twitter as IconBrandX,
  Github as IconBrandGithub
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { FloatingDock } from '../components/FloatingDock.jsx';
import { FocusCards, cards } from './FocusCards.jsx';


export default function RoleSelection() {
  const navigate = useNavigate();
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },

    {
      title: "Instagram",
      icon: <FaInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.instagram.com/clavenncoutinho/?next=%2F",
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://linkedin.com/in/yourprofile",
    },


    {
      title: "Twitter",
      icon: <FaTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Github",
      icon: <FaGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://instagram.com/yourprofile",
    },
  ];




  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar>
        <NavBody visible={true}>
          <NavbarLogo />
          <NavItems
            items={[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" }
            ]}
            onItemClick={() => { }}
          />
          <NavbarButton href="/login">Login</NavbarButton>
        </NavBody>
      </Navbar>


      {/* <div className="mt-10">
          <TypewriterEffect
            words={[
              { text: "Parent", className: "" },
              { text: "Teacher Connection", className: "" }
            ]}
            className="mb-6"
            cursorClassName="bg-white-500"
          />
        </div> */}

      {/* Spotlight Div */}
      <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            Lumos <br /> Gentle insights Stronger bonds.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">

            Spotlight effect is a great way to draw attention to a specific part
            of the page. Here, we are drawing the attention towards the text
            section of the page. I don&apos;t know why but I&apos;m running out of
            copy.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* === Background Content with Lines === */}
        <div className="absolute inset-0 z-0">
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">


          </BackgroundLines>
        </div>

        {/* ===Mask Effect === */}
        <div className="relative z-10 flex h-[25rem] w-full items-center justify-center overflow-hidden">
          <MaskContainer
            revealText={
              <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
                Welcome to Lumos! We would like to know your role so that we can help you to connect with us...
              </p>
            }
            className="h-[40rem] rounded-md border text-white dark:text-black"
          >
            Please choose only one role{" "}
            <span className="text-blue-500">Admin </span>
            or <span className="text-blue-500">Teacher </span>
            or either<span className="text-blue-500"> Parent </span>.
          </MaskContainer>


        </div>

        {/* Cards logic */}
        <div className="py-20 px-6 md:px-10">
          <FocusCards cards={cards} />
        </div>


        {/* Main  Logic  */}
        <div className="mt-10 z-10 relative flex flex-row justify-center items-center gap-60 mb-8">

          {['admin', 'teacher', 'parent'].map((role) => (
            <button
              key={role}
              onClick={() => navigate(`/signup/${role}`)}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-white hover:text-black transition"
            >
              {role.toUpperCase()}
            </button>
          ))}
        </div>

        {/* About Us */}




      </div>


      {/* Footer */}
      <div className="mt-10 max-w-4xl mx-auto w-full px-4">
        <div className="flex justify-center">
          <FloatingDock
            mobileClassName="translate-y-20" // only for demo, remove for production
            items={links}
          />
        </div>
      </div>







    </div>
  );
}
