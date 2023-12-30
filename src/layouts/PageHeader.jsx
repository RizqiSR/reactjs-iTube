import { Menu, Upload, Bell, User, Mic, Search } from "lucide-react"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function PageHeader() {
  const [showFullWidthSearch, setshowFullWidthSearch] = useState(false)

  return (
    // 1. Grup header 1: hamburger menu, logo
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div className={`gap-4 items-center flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
        <Button variant="ghost" size="icon" >
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} alt="WebTube" className="h-6" />
        </a>
      </div>

      {/* 2. Grup header 2: search bar */}
      <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>
        {showFullWidthSearch && <Button onClick={() => setshowFullWidthSearch (false)} type="button" size="icon" variant="ghost" className="flex-shrink-0">
          <ArrowLeft />
        </Button>
        }
        <div className="flex flex-grow max-w-[600px]">
          <input type="search" placeholder="Search" className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none" />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>

      </form>

      {/* // 3. Grup header 3: notification bell, user button, upload video */}
      <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>
        <Button onClick={() => setshowFullWidthSearch(true)} variant="ghost" size="icon" className="md:hidden" >
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" >
          <Mic />
        </Button>
        <Button variant="ghost" size="icon" >
          <Upload />
        </Button>
        <Button variant="ghost" size="icon" >
          <Bell />
        </Button>
        <Button variant="ghost" size="icon" >
          <User />
        </Button>
      </div>
    </div>

  )
}