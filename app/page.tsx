import dynamic from "next/dynamic"
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="h-full">
      <Navbar />
      <Scene />
    </main>
  )
}
