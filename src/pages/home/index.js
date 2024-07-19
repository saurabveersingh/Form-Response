import { useState } from "react"

import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"

import ToastMessage from "components/ToastMessage"

import useToast from "custom-hooks/useToast"
import useDevice from "custom-hooks/useDevice"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Home page of the website
 * @returns Home page
 */
// ! component

const Home = () => {
  const Device = useDevice()

  const [toast, setToast] = useToast()
  const [departure, setDeparture] = useState("Any")
  const [arrival, setArrival] = useState("Any")

  const departureOptions = [
    "Any",
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmdabad",
    "Kochi",
    "Pune",
    "Goa",
    "Srinagar",
    "Chandigarh",
    "Amritsar",
  ]

  const arrivalOptions = ["Any", "Dublin", "Shannon", "Cork", "Knock"]

  return (
    <div className={`mt-3`}>
      <ToastMessage {...toast} setToast={setToast} />

      <div className={`${Style.content_holder} p-4 bg-white br-8px`}>
        <div className={`${Device.isMobile ? "" : `d-flex justify-content-center`}`}>
          <div className={`d-flex ${Device.isMobile ? "mt-4 justify-content-between" : `me-4`}`}>
            <p className={`pt-1 pe-2`}>Departure Airport: </p>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-departure" className="bg-6E4942 border-0">
                {departure}
              </Dropdown.Toggle>
              <Dropdown.Menu className="scroll-y h-20vh">
                {departureOptions.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => setDeparture(item)}>
                      {item}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className={`d-flex ${Device.isMobile ? "mt-4 justify-content-between" : ``}`}>
            <p className={`pt-1 pe-2`}>Arrival Airport: </p>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-arrival" className="bg-6E4942 border-0">
                {arrival}
              </Dropdown.Toggle>
              <Dropdown.Menu className="scroll-y h-20vh">
                {arrivalOptions.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => setArrival(item)}>
                      {item}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button className="bg-6E4942 border-0">Go</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
