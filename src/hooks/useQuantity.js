import { useState } from "react"

function useQuantity(initialValue = 0, min = 0, max = 0) {
  const [count, setCount] = useState(initialValue)

  const changeQuantity = function (type) {
    const tempCont = type === "inc" ? count + 1 : count - 1
    const value = Math.max(min, Math.min(max, tempCont))
    setCount(value)
  }

  return [
    count,
    changeQuantity
  ]
}

export default useQuantity;
