import React from 'react';

type ChoiceCharacterProps {
    value: string;
    onSelect1: () => void;
    onSelect2: () => void;
    onSelect3: () => void;
  }

function ChoiceCharacter({ value, onSelect1, onSelect2, onSelect3 }:ChoiceCharacterProps) {

    
    // const [value, setValue] = useState("")
    // const onSelect1 = () => {
    //    setValue("멍멍이")
    // }
    // const onSelect2 = () => {
        // setValue("치와와")
    //  }
    //  const onSelect3 = () => {
        // setValue("포메라이안")
    //  } 

    return (
      <div>
        <h1>{value}</h1>
        <div>
          <button onClick={onSelect1}>"player1"</button>
          <button onClick={onSelect2}>"player2"</button>
          <button onClick={onSelect3}>"player3"</button>
        </div>
      </div>
    );
  }

export default ChoiceCharacter;