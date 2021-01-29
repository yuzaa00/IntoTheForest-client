import React, { useState, useEffect }from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer' 
import { useHistory } from "react-router-dom";
import axios from "axios";

function SingleResult() {
    const history = useHistory();

    const gameDataFinal = useSelector((state: RootState) => state.singleReducer.gameData, shallowEqual)
    console.log(gameDataFinal)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:4000/rank/load')//시크릿코드 쉘터 shelter
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [] )
//...gameDataFinal
        const [customerRankUp, setCustomerRankUp] = useState(
            { nickname: '', score: 0, stage: 0, subcha: 0}
        );
    
        const handleChange = (event) => {
            setCustomerRankUp({...customerRankUp, [event.target.name]: event.target.value})
        }
    
        const handleRankUp = (e) => {
            e.preventDefault()
            axios.post('http://localhost:4000/rank/reg', customerRankUp)
              .then((response) => {
                //console.log(response)
                if (response.status === 201) {
                    alert('🙇랭크등록에 성공하셨습니다!🙏')
                }
            }).then(() => {
                history.push('/');//
            })
              .catch(function (error) {
                  console.log(error)
            }) 

    }

    return (
      <div>
          <ul>
              {posts.map(post => (
                  <li key={post.id}>{post.nickname}{post.score}{post.life}{post.stage}{post.bird}{post.squi}</li>
              ))}
          </ul>

          <div className="newNickName">
  <form className='nameNickNew' onSubmit={handleRankUp}>
      <h5 className="rankUpNickname">Rank Up With Nickname</h5>                        
      <div className="rank-input-field">
          <label htmlFor="nickname">Nickname</label>
          <input type="text" name="nickname" value={customerRankUp.nickname} onChange={handleChange} required />
      </div>
      <div className="rank-input-field"> 
          <button className="btnRankUp" type="submit">Rank Up</button>
      </div>
  </form>
</div>
      </div>
    );
  }
  
  export default SingleResult;


