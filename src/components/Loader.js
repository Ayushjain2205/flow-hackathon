import React from "react"
import Lottie from "react-lottie-player"
import loading from "../helpers/loading.json"

const Loader = () => {
  return (
    <div>
      <Lottie loop animationData={loading} play style={{ width: 117, height: 117 }} />
    </div>
  )
}

export default Loader
