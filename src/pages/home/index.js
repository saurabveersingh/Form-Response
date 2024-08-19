import { useState, Fragment, useRef } from "react"

import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import ReCAPTCHA from "react-google-recaptcha"

import Header from "components/Header"
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
  const [page, setPage] = useState(0)
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState([
    // {
    //   Airlines: "Turkish",
    //   "Cabin Baggage Included in price": "7kg",
    //   "Check in Baggage included in price": "40kg",
    //   "Email Address": "saurabveersingh@gmail.com",
    //   "Flight Arrival Airport": "Dublin",
    //   "Flight Arrival Date and Time": "2024-08-12T15:54:59.999",
    //   "Flight Departure Airport": "Delhi",
    //   "Flight Departure Date and Time": "2024-08-12T06:35:00.000",
    //   "Flight duration Including layovers": "13-14 hrs",
    //   Name: "Saurab",
    //   "Phone number": "+91 9988301036",
    //   Price: 50000,
    //   Timestamp: "2024-07-19T11:24:45.732",
    // },
  ])

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

  const captcha = useRef()

  const showResults = () => {
    const captchaValue = captcha.current.getValue()
    if (!captchaValue) {
      setToast({ type: "error", message: "Please verify Captcha" })
      return
    }
    setPage(1)
    fetch("https://api.sheetapi.rest/api/v1/sheet/WjTR7T443FMTR5WuCozvU")
      .then((response) => response.json())
      .then((res) => {
        setData(res.filter(filterDeparture).filter(filterArrival).sort(sortByDate))
        setLoader(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const filterDeparture = (item) => {
    if (departure === "Any") return item
    console.log(item["Flight Departure Airport"], departure)
    return item["Flight Departure Airport"] === departure
  }

  const filterArrival = (item) => {
    if (arrival === "Any") return item
    return item["Flight Arrival Airport"] === arrival
  }

  const sortByDate = (a, b) => {
    return new Date(a["Flight Departure Date and Time"]) < new Date(b["Flight Departure Date and Time"]) ? -1 : 1
  }

  return (
    <Fragment>
      {page === 0 && <Header />}
      <div className={`mt-3`}>
        <ToastMessage {...toast} setToast={setToast} />

        {page === 0 ? (
          <div className={`${Style.content_holder} p-4 bg-white br-8px d-flex flex-column align-items-center`}>
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

              <div className={`d-flex mb-4 ${Device.isMobile ? "mt-4 justify-content-between" : ``}`}>
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

            <ReCAPTCHA sitekey="6LdLXRQqAAAAAPpvAPYy3SqdfeZvS8XmiGpKjePu" ref={captcha} />

            <div className="d-flex justify-content-center mt-4">
              <Button className="bg-6E4942 border-0" onClick={showResults}>
                Go
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-90vw max-h-60vh overflow-scroll">
            {loader ? (
              <div className="d-flex align-items-center justify-content-center h-50vh">
                <Spinner />
              </div>
            ) : (
              <table className={`text-center ${Style.table}`}>
                <thead>
                  <tr className={`bg-6E4942 text-white ${Style.header_row}`}>
                    {departure === "Any" && <th>Departure</th>}
                    {arrival === "Any" && <th>Arrival</th>}
                    <th>Departure Date & Time</th>
                    <th>Arrival Date & Time</th>
                    <th>Duration</th>
                    <th>Cost</th>
                    <th>Baggage</th>
                    <th>Airlines</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    let d = new Date(item["Flight Departure Date and Time"])
                    let a = new Date(item["Flight Arrival Date and Time"])
                    return (
                      <tr key={index} className={`bg-white ${Style.rows}`}>
                        {departure === "Any" && <td>{item["Flight Departure Airport"]}</td>}
                        {arrival === "Any" && <td>{item["Flight Arrival Airport"]}</td>}
                        <td>{d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
                        <td>{a.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
                        <td>{item["Flight duration Including layovers"]}</td>
                        <td>{item["Price"]}</td>
                        <td>{item["Check in Baggage included in price"] + " + " + item["Cabin Baggage Included in price"]}</td>
                        <td>{item["Airlines"]}</td>
                        <td>{item["Name"]}</td>
                        <td>{item["Phone number"]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Home
