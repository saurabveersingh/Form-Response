import HeaderImage from "images/header.jpg"

import Image from "components/custom-components/Image"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Layout of the website
 * @returns Layout Component
 */
// ! component

const Header = () => {
  return (
    <header className="mt-12px">
      <Image src={`${HeaderImage}`} alt="airplane" className={`br-8px ${Style.header_image}`} />
    </header>
  )
}

export default Header
