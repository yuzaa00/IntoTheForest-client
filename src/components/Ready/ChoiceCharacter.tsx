import React from 'react';
import John from '../../images/character/john.png'
import Tom from '../../images/character/backgu.png'
import Alex from '../../images/character/dosaDog.png'

type ChoiceCharacterProps {
    value: string;
    onSelect1: () => void;
    onSelect2: () => void;
    onSelect3: () => void;
  }

function ChoiceCharacter({ value, onSelect1, onSelect2, onSelect3 }:ChoiceCharacterProps) {

    
   
    const onGameDesc = () => {
      //history
     }
    const onGameStart = () => {
      {value}
      //history.push
    }
    //  const onSelect3 = () => {
        // setValue("포메라이안")
    //  } 

    return (
      <div className="chaSelectBx">
        <h1>{value}</h1>
        <div>
          <div onClick={onSelect1} className="box">
            <div className="imgBx">
              <img src={John} alt='john' />
            </div>
            <div className="imgBxContent">
             <h2>John{"\n"}<span>믹스견
               </span></h2>
            </div>
          </div>
          <div onClick={onSelect2} className="box">
            <div className="imgBx">
            <img src={Tom} alt='tom' />
            </div>
            <div className="imgBxContent">
             <h2>Tom{"\n"}<span>진돗개
               </span></h2>
            </div>
          </div>
          <div onClick={onSelect3} className="box">
            <div className="imgBx">
            <img src={Alex} alt='alex' />
            </div>
            <div className="imgBxContent">
             <h2>Alex{"\n"}<span>도사견
               </span></h2>
            </div>
          </div>
        </div>
        <div>
          <button onClick={onGameDesc}>"게임설명"</button>
          <button onClick={onGameStart}>"GameStart"</button>
        </div>
      </div>
    );
  }

export default ChoiceCharacter;