"use client";

import { PublicProjects } from "./components/public-projects";
import { ContactMe } from "./components/contact-me";

export default function Home() {
  return (
  <main>
    <PublicProjects />
    <ContactMe />
  </main>
  );
}