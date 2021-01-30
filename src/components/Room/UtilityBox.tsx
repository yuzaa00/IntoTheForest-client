import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { roomSocket } from '../../utils/socket';
import * as controlStream from '../../utils/controlStream';

import { IoIosExit } from 'react-icons/io';
import { BsLockFill, BsUnlockFill } from 'react-icons/bs';
import {
  FaVideo,
  FaVideoSlash,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import Modal from '../Mode/Modal'

import Button from '../Mode/Button';
import { relative } from 'path';

import EditProfile from './EditProfile'

function UtilityBox() {
  const history = useHistory();
  const [streamOptions, setStreamOptions] = useState({
    audio: true,
    video: true,
  })
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalComponents, setmodalContent] = useState(null)

  const handleAudioTrack = useCallback(() => {
    if (streamOptions.audio) {
      controlStream.audioOption.off();
      setStreamOptions(prev => ({ ...prev, audio: false }));
    } else {
      controlStream.audioOption.on();
      setStreamOptions(prev => ({ ...prev, audio: true }));
    }
  }, [streamOptions]);

  const handleVideoTrack = useCallback(() => {
    if (streamOptions.video) {
      controlStream.videoOption.off();
      setStreamOptions(prev => ({ ...prev, video: false }));
    } else {
      controlStream.videoOption.on();
      setStreamOptions(prev => ({ ...prev, video: true }));
    }
  }, [streamOptions]);

  
  const openModal = (modalComponents: any) => {
    setmodalContent(modalComponents)
    setModalOpen(true)
  }

  return (
    <Wrapper>
      <div>
      <Button onClick={() => openModal(<EditProfile setModalOpen={setModalOpen}/>)}>
          <CgProfile
            size={42}
            color={'black'}
            />
        </Button>
        <Button
          color={streamOptions.audio ? 'limegreen' : 'lightGray'}
          onClick={handleAudioTrack}>
          {streamOptions.audio ?
            <FaVolumeUp size={24} />
            :
            <FaVolumeMute size={24} />
          }
        </Button>
        <Button
          color={streamOptions.video ? 'red' : 'lightGray'}
          onClick={handleVideoTrack}>
          {streamOptions.video ?
            <FaVideo size={24} style={{
              'position': 'relative',
              'top': '2px',
              'left': '1px' }} />
            :
            <FaVideoSlash size={24} />
          }
        </Button>


        <IoIosExit
            size={42}
            
            color={'black'}
          />
      </div>
      {isModalOpen &&
          <Modal setModalOpen={setModalOpen}>{modalComponents}</Modal>
      }
    </Wrapper>
  );
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