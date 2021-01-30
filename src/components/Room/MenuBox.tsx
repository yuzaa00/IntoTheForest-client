import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { roomSocket } from '../../utils/socket';

import { IoIosExit } from 'react-icons/io';
import { CgProfile } from "react-icons/cg";

import Button from '../Mode/Button';

function UtilityBox() {
  const history = useHistory();

  const handleProfile = () => {
    
  }

  return (
    <Wrapper>
      <div>
        <Button onClick={handleProfile}>
          <CgProfile
            size={42}
            color={'black'}
            />
        </Button>

        <Button onClick={() => history.push('/mode')}>
          <IoIosExit
            size={42}
            
            color={'black'}
          />
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 15;
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
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