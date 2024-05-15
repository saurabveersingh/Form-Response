import ToastMessage from "components/ToastMessage"
import { Button } from "react-bootstrap"

import useToast from "custom-hooks/useToast"

// !definition of component
/**
 *
 * @description --> Home page of the website
 * @returns Home page
 */
// ! component

const Home = () => {
  const [toast, setToast] = useToast()

  return (
    <div className="ms-3 mt-5 pt-2">
      <ToastMessage {...toast} setToast={setToast} />
      Content
    </div>
  )
}

export default Home
