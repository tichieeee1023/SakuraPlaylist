import React from 'react'
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
}

export default Counter