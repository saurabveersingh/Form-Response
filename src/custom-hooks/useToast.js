import { useState, useEffect } from "react"

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
