import "./Roominfo.css"
import React, { useCallback, useState, useEffect } from "react"
import { store } from "../../index"

import { roomSocket } from "../../utils/socket"

function RoomInfo() {
  const [render, setRender] = useState(false)
  

  // roomSocket.listenReadyCheck((socketId: string) => {
  //   console.log(3)
  //   // const readyUser = store.getState().roomReducer.users.filter((user) => user.socketId === socketId)[0]
  //   const readyUserNum = store.getState().roomReducer.users.findIndex((user) => user.socketId === socketId)
  //   userList[readyUserNum].ready = true
  // })

  useEffect(() => {
    roomSocket.listenReadyCheck((socketId: string) => {
      let userList = store.getState().roomReducer.users
      
      // const readyUser = store.getState().roomReducer.users.filter((user) => user.socketId === socketId)[0]
      let readyUserNum = store.getState().roomReducer.users.findIndex((user) => user.socketId === socketId)
      userList[readyUserNum].ready = true
      setRender(!render)
    })
  })

  // useEffect(() => {
  // }, [isReady])

  return (
    <div className="Infocontainer"> 레디 상태
      {store.getState().roomReducer.users.map((user, idx) => (
        <div key={idx}>
          <div className="Infocontent">{user.nickName} {user.ready ? '✅' : '☑️'} </div>
          </div>
      ))}
    </div>
  )
}

export default RoomInfo;
