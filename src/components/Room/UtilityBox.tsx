import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'
import * as controlStream from '../../utils/controlStream'
import { ImExit } from "react-icons/im";
import { FaVideo, FaVideoSlash, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { CgProfile } from "react-icons/cg"
import Button from '../Mode/Button'
import EditProfile from './EditProfile'
import { createBrowserHistory } from 'history'

function UtilityBox() {
  const history = createBrowserHistory({forceRefresh:true})
  const disPatch = useDispatch()
  const [streamOptions, setStreamOptions] = useState({
    audio: true,
    video: true,
  })
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalComponents, setmodalContent] = useState(null)

  const handleAudioTrack = useCallback(() => {
    if (streamOptions.audio) {
      controlStream.audioOption.off()
      setStreamOptions(prev => ({ ...prev, audio: false }));
    } else {
      controlStream.audioOption.on()
      setStreamOptions(prev => ({ ...prev, audio: true }));
    }
  }, [streamOptions])

  const handleVideoTrack = useCallback(() => {
    if (streamOptions.video) {
      controlStream.videoOption.off()
      setStreamOptions(prev => ({ ...prev, video: false }));
      disPatch({
        type: 'TURN_ON_FILTER'
      })
    } else {
      controlStream.videoOption.on()
      setStreamOptions(prev => ({ ...prev, video: true }));
      disPatch({
        type: 'TURN_OFF_FILTER'
      })
    }
  }, [streamOptions])

  
  const openModal = (modalComponents: any) => {
    setmodalContent(modalComponents)
    setModalOpen(true)
  }

  return (
    <>
    <Wrapper>
      <div>
      <Button color='deepskyblue' onClick={() => setModalOpen(!isModalOpen)}>
          <CgProfile
            size={34}
            color={'black'}
            />
        </Button>
        <Button
          color={streamOptions.audio ? 'limegreen' : 'lightGray'}
          onClick={handleAudioTrack}>
          {streamOptions.audio ?
            <FaVolumeUp size={34} />
            :
            <FaVolumeMute size={34} />
          }
        </Button>
        <Button
          color={streamOptions.video ? 'red' : 'lightGray'}
          onClick={handleVideoTrack}>
          {streamOptions.video ?
            <FaVideo size={34} style={{
              'position': 'relative',
              'top': '2px',
              'left': '1px' }} />
            :
            <FaVideoSlash size={34} />
          }
        </Button>
        <span style={{
          bottom: '-4px',
          right: '-6px',
          position: 'relative' 
          }}>
        
        <ImExit
            size={50}
            color={'black'}
            cursor={'pointer'}
            onClick={() => history.push('/mode')}
          />
          </span>
      </div>
    </Wrapper>
    {isModalOpen && <EditProfile setModalOpen={setModalOpen}/>}
    </>
  )
}

const Wrapper = styled.div`
  z-index: 15;
  width: 100%;
  height: 160px;
  left: 0px;
  bottom: 89%;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    padding: 10px 24px;
    border-radius: 20px;
    margin-bottom: 24px;
    background-color: white}
  }

  button:not(:last-child) {
    margin-right: 16px;
  }
`

export default UtilityBox
