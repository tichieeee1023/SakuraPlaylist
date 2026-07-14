import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import Counter from '../count/Counter'
import ResetCounter from '../count/ResetCounter'

const Board = () => {
  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">SAKURA PLAYLIST</h2>
      
      <div className="dashboard-grid">
        
        <div className="left-col">
          <PostList />
        </div>
        
        <div className="right-col">
          <PostForm />
          
          <div className="counter-container">
            <Counter />
            <ResetCounter />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Board