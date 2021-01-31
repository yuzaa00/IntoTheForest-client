import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'
import { useHistory } from 'react-router-dom'
import { store } from '../../index'
import styled from 'styled-components';
import { RootState } from '../../redux/rootReducer'
 
function LoadingRoom() {
  const history = useHistory()
  const roomId = store.getState().roomReducer.roomId
  useEffect(() => {
    if(!roomId) {
      alert('잘못된 접근 입니다. 처음 화면으로 돌아갑니다.')
      history.push('/mode')
    }
    setTimeout(() => {
      history.push(`rooms/${roomId}`)
    }, 1000)
  }, [])

 return (
   <Wrap>
     <ReactLoading type={'bubbles'} color={'gold'} height={'5%'} width={'5%'} />
   </Wrap>
 )
}

const Wrap = styled.div`
  width: 100%;
  height: 52vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(76deg,#00BCD4,#77EDAC)
`;
     
export default LoadingRoom