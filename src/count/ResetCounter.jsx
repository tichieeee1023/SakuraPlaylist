import React from 'react'
import useCouterStore from '../store/counterStore'

const ResetCounter = () => {
  const { reset } = useCouterStore()

  return (
    <div className="sakura-reset">
      <button className="reset-btn" onClick={reset}>
        <span className="icon">🔄</span>
        <span>마음 비우기</span>
      </button>
    </div>
  )
}

export default ResetCounter