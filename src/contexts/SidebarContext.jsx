/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const SidebarContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebarContext() {
  const value = useContext(SidebarContext)

  if(value == null) throw Error("Cannot use outside SidebarProvider")
  return value
}

export function SidebarProvider({children}) {
  const [isLargeOpen, setIsLargeOpen] = useState(true) // maksudnya: ketika pertama kali buka web di desktop, default screen ukurannya >= large, otomatis sidebar default-nya sudah tampil. baru ketika kita klik hamburger menu, nilai isLargeOpen = false (sidebr disembunyikan)
  const [isSmallOpen, setIsSmallOpen] = useState(false) // ini kebalikannya
  
  function isSmallScreen() {
    // cek dulu viewport-nya masuk ke kategori sm (small) atau enggak
    // output: boolean
    // 1024: breakpoint lg dalam tailwindcss
    return window.innerWidth < 1024 
  }

  useEffect(() => {
    const handler = () => {
      if (!isSmallScreen()) setIsSmallOpen(false)
    }

    window.addEventListener("resize", handler)


  }, [])

  function toggle() {
    isSmallScreen() ? setIsSmallOpen(s => !s) : setIsLargeOpen(l => !l)
  }

  function close() {
    isSmallScreen() ? setIsSmallOpen(false) : setIsLargeOpen(false)
  }

  return (
    <SidebarContext.Provider value={{isLargeOpen, isSmallOpen, toggle, close}}>
      {children}
    </SidebarContext.Provider>
  )
}