import PropTypes from "prop-types"

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
    <div className={`d-flex align-items-center flex-column min-h-100vh bg-D4C8C6`}>
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
