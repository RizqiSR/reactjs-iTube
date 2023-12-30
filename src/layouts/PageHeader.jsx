import { Menu, Upload, Bell, User } from "lucide-react"
import logo from "../assets/logo.png"
import Button from "../components/Button"

export default function PageHeader() {
  return (
    // 1. Grup header 1: hamburger menu, logo
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon" >
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} alt="WebTube" className="h-6" />
        </a>
      </div>

      {/* 2. Grup header 2: search bar */}
      

      {/* // 3. Grup header 3: notification bell, user button, upload video */}
      <div className="flex flex-shrink-0 md:gap-2">
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