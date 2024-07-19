import { useState, useEffect } from "react"

// !definition of component
/**
 *
 * @description --> Detects screen size
 * @returns an object of two boolean values isMobile and isBigScreen
 */
// ! component

const useDevice = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [device, setDevice] = useState({ isMobile: null, isBigScreen: null })

  useEffect(() => {
    //Set States after first load
    let width = window.innerWidth
    setScreenWidth(width)
    setDevice({ isMobile: width < 768, isBigScreen: width > 2500 })

    // Initiates event listener for any resizing of window.
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Updates Global state after delay when window resizing stops.
    const debounce = setTimeout(() => {
      setDevice({ isMobile: screenWidth < 768, isBigScreen: screenWidth > 2500 })
    }, 1000)

    return () => clearTimeout(debounce)
  }, [screenWidth])

  return device
}

export default useDevice
