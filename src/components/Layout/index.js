import { Fragment } from "react"
import PropTypes from "prop-types"

import Header from "../Header"
import Footer from "../Footer"

// !definition of component
/**
 *
 * @param props --> children
 * @description --> Layout of the website
 * @returns Layout Component
 */
// ! component

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
