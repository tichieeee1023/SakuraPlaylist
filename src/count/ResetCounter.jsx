import React from 'react'
import useCouterStore from '../store/counterStore'

const ResetCounter = () => {
  const { reset } = useCouterStore()

  return (
<<<<<<< HEAD
    <div className="sakura-reset">
      <button className="reset-btn" onClick={reset}>
        <span className="icon">🔄</span>
        <span>마음 비우기</span>
      </button>
=======
    <div>
      <h2>리셋합니다</h2>
      <br />
      <button onClick={reset}>리셋</button>
      <br /><br />
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
    </div>
  )
}

export default ResetCounter