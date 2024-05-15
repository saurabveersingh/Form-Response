import { Fragment } from "react"
import PropTypes from "prop-types"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @param props --> type, message and setToast
 * @description --> provides self dismissed notifictions to notify users without interupting the flow.
 * @returns ToastMessage Component
 */
// ! component

const ToastMessage = (props) => {
  const closeAlert = () => {
    props.setToast({})
  }

  return (
    <Fragment>
      {props.type && (
        <div className={`position-fixed right-0 fs-18px z-index-max ${Style.alert_box_wrapper}`}>
          <div
            className={`alert ${
              props.type === "success" ? `alert-success` : `alert-danger`
            } alert-dismissible fade show d-flex align-items-center p-2`}
            role="alert"
          >
            <button type="button" className="btn-close position-static pt-2" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true" className="d-none">
                ×
              </span>
            </button>
            {props.message}
          </div>
        </div>
      )}
    </Fragment>
  )
}

ToastMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  setToast: PropTypes.func,
}

export default ToastMessage
