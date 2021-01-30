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

import Button from '../Mode/Button';


function UtilityBox() {
  const history = useHistory();
  const [streamOptions, setStreamOptions] = useState({
    audio: true,
    video: true,
  })

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

  return (
    <Wrapper>
      <div>
        <Button
          color={streamOptions.audio ? 'deepskyblue' : 'lightGray'}
          onClick={handleAudioTrack}>
          {streamOptions.audio ?
            <FaVolumeUp size={24} />
            :
            <FaVolumeMute size={24} />
          }
        </Button>
        <Button
          color={streamOptions.video ? 'deeppink' : 'lightGray'}
          onClick={handleVideoTrack}>
          {streamOptions.video ?
            <FaVideo size={24} />
            :
            <FaVideoSlash size={24} />
          }
        </Button>
        <IoIosExit
          onClick={() => history.push('/mode')}
          size={42}
          cursor='pointer'
          color={'black'}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 15;
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0px;
  bottom: 0px;
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
    background-color: #e4e4e4}
  }

  button:not(:last-child) {
    margin-right: 16px;
  }
`

export default UtilityBox