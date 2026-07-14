import React from 'react'
<<<<<<< HEAD
import useCounterStore from '../store/counterStore'

const Counter = () => {
  const { count, increase, decrease } = useCounterStore()

  return (
    <div className="sakura-counter">
      <div className="counter-info">
        <span className="pulse-heart">💖</span>
        <div className="text-box">
          <span className="title">오늘의 벚꽃 지수</span>
          <span className="desc">방문자들의 사랑을 모아주세요!</span>
        </div>
      </div>

      <div className="number-display">
        {count} <span className="unit">개</span>
      </div>

      <div className="btn-group">
        <button className="decrease-btn" onClick={decrease}>- 뺏기</button>
        <button className="increase-btn" onClick={increase}>+ 하트</button>
      </div>
    </div>
  )
=======
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
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
}

export default Counter