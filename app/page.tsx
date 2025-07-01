import ModernHero from "@/components/sections/ModernHero"
import Header from "@/components/layout/Header"
import Experience from "@/components/sections/Experience"
import ModernEducation from "@/components/sections/ModernEducation"
import ModernSkills from "@/components/sections/ModernSkills"
import ModernProjects from "@/components/sections/ModernProjects"
import ModernBlog from "@/components/sections/ModernBlog"
import ModernContact from "@/components/sections/ModernContact"
import ModernFooter from "@/components/layout/ModernFooter"

export default function Home() {
  return (
    <main>
      <ModernHero />
      <Header />
      <Experience />
      <ModernEducation />
      <ModernSkills />
      <ModernProjects />
      <ModernBlog />
      <ModernContact />
      <ModernFooter />
    </main>
  )
}
