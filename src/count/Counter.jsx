import React from 'react'
import useCouterStore from '../store/counterStore'

const Counter = () => {
  const { count, increase, decrease } = useCouterStore()

  return (
  <div className="counter-container">
    <div className="counter-box">
      <h2>카운터 스토어</h2>
      <div className="number">{count}</div>
      <div className="btn-group">
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    </div>
  </div>
)
}

export default Counter