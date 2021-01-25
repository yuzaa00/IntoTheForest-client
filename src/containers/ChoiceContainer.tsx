import React from 'react';
import ChoiceCharacter from '../components/Ready/ChoiceCharacter';
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { select1, select2, select3 } from '../redux/reducers/choiceReducer';

function ChoiceContainer() {
  const value = useSelector((state: RootState) => state.choiceReducer.value);
  const dispatch = useDispatch();

  const onSelect1 = () => {
    dispatch(select1());
  };
  const onSelect2 = () => {
    dispatch(select2());
  };
  const onSelect3 = () => {
    dispatch(select3());
  };

  return (
    <ChoiceCharacter 
     value={value} 
     onSelect1={onSelect1} 
     onSelect2={onSelect2} 
     onSelect3={onSelect3} 
    />
  );
};

export default ChoiceContainer;