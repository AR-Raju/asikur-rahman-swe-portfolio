"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero_area");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero_area", "experience_area", "education_area", "skill_area", "projects_area", "blog_area", "contact_area"];

      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header id="toolbar_area">
      <div className="container flex items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="pl-4 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Asikur Rahman</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex">
            <li>
              <a
                onClick={() => scrollToSection("hero_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "hero_area" ? "text-primary" : ""
                }`}
              >
                Intro
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("experience_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "experience_area" ? "text-primary" : ""
                }`}
              >
                Experiences
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("education_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "education_area" ? "text-primary" : ""
                }`}
              >
                Education
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("skill_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "skill_area" ? "text-primary" : ""
                }`}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("projects_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "projects_area" ? "text-primary" : ""
                }`}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("blog_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "blog_area" ? "text-primary" : ""
                }`}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("contact_area")}
                className={`block py-2 px-3 rounded md:bg-transparent cursor-pointer ${
                  activeSection === "contact_area" ? "text-primary" : ""
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
