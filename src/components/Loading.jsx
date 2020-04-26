import React, { PureComponent } from 'react'

class Loading extends PureComponent {
  render() {
    return (
      <div className="loading">
        <svg className="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="3" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    )
  }
}

export default Loading
