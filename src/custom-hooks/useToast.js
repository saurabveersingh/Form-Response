import { useState, useEffect } from "react"

// !definition of component
/**
 *
 * @description --> Used to manage toasts.
 * @returns a toast value and set value method.
 */
// ! component

const useToast = () => {
  const [toast, setToast] = useState({})

  const resetToast = () => {
    setToast({})
  }

  useEffect(() => {
    if (toast.type) {
      setTimeout(resetToast, 5000)
    }
  }, [toast])

  return [toast, setToast]
}

export default useToast
