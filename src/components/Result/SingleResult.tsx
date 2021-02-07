import React, { useState, useEffect }from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer' 
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { useTable } from 'react-table';
import axios from "axios";
import './SingleResult.css';

const Styles = styled.div`
  background-color: linear-gradient(235deg, #77EDAC, #00BCD4);
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 0px solid black;
    margin: 0 auto;

    tr {
      :last-child {
        td {
          border-bottom: 0.5px solid gray;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 1.8rem;
      border-bottom: 0.5px solid gray;
      border-right: 0px solid black;

      :last-child {
        border-right: 0;
      }
    }

    th {
      color: red;
    }
  }
`
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns, data
  })
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


function SingleResult() {
    const history = useHistory();

    const gameDataFinal = useSelector((state: RootState) => state.singleReducer.gameData, shallowEqual)
    const accessToken = useSelector((state: RootState) => state.singleReducer.accessToken, shallowEqual)
    const [posts, setPosts] = useState([])
    const [rankOn, setRankOn] = useState(false)

    useEffect(() => {
        axios
        .get('http://localhost:4000/rank/load',
        {
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [] )
    
    let obj = {
        score: gameDataFinal.score,
        stage: gameDataFinal.stage + 1,
        subcha: gameDataFinal.bird ? gameDataFinal.bird : 0 + gameDataFinal.squi ? gameDataFinal.squi : 0
    }
        const [customerRankUp, setCustomerRankUp] = useState(
            { nickname: ''}
        );
    
        const handleChange = (event) => {
            setCustomerRankUp({...customerRankUp, [event.target.name]: event.target.value})
        }
    
        const handleRankUp = async (e) => {
            e.preventDefault()

            let newGameDataFinal = Object.assign({},customerRankUp, obj);
            
            await axios.post('http://localhost:4000/rank/reg', newGameDataFinal,
            {
              headers: {"Authorization": `Bearer ${accessToken}`}
            })
              .then((response) => {
                if (response.status === 201) {
                    alert('🙇랭크등록에 성공하셨습니다!🙏')
                }
            }).then(() => {
                setRankOn(true)

                axios
                  .get('http://localhost:4000/rank/load',//시크릿코드 쉘터 shelter
                  {
                      headers: {"secretCode": "shelter"}
                  })
                  .then(res => {
                      setPosts(res.data)
                  })
                  .catch(err => {
                      console.log(err)
                  })


            })
              .catch(function (error) {
                  console.log(error)
            }) 

    }

    const columns = React.useMemo (
      () => [
    
        {
          Header: 'Ranking',
          columns: [

            {
              Header: '닉네임',
              accessor: 'nickname',
            },
            {
              Header: '스코어',
              accessor: 'score',
            },
            {
              Header: '스테이지',
              accessor: 'stage',
            },
            {
              Header: '서브캐',
              accessor: 'subcha',
            },
          ],
        },
      ],
      []
    )

    const onChoiceModeBack = () => {
      window.open('/', '_self')
     }
   
    return !rankOn ? (
      <div className="singleResultScreen">
        <div className="imageResultLayout">
        </div>
        <div className="singleResultLayout">
         <div className="singleRankTables">
          <Styles>
            <Table columns={columns} data={posts} />
          </Styles>
         </div>
          
         <div className="newNickName">
          <form className='nameNickNew' onSubmit={handleRankUp}>
          <h5 className="rankUpNickname">Rank Up With Nickname</h5>                        
          <div className="rank-input-field">
          <input className="input-nickName" type="text" placeholder="닉네임을 정해주세요" name="nickname" value={customerRankUp.nickname} onChange={handleChange}/>
          <button className="btnRankUp" type="submit">Rank Up</button>
          </div>
          </form>
         </div>
        </div>
      </div>
    ):(
      <div className="singleResultScreen">
        <div className="imageResultLayout">
        {/* <div className="gameClearMessage">GAME CLEAR !!</div>  */}
        {/* <img className="family" src={family} alt='family' /> */}
        </div>
        <div className="singleResultLayout">
        <div className="singleRankTables">
          <Styles>
            <Table columns={columns} data={posts} />
          </Styles>
        </div>
        <div className="choiceModeBack">
          <button className="btnChoiceBacK" onClick={onChoiceModeBack}>솔로/멀티 돌아가기</button>
        </div> 
        </div>
      </div>
    );
  }
  
  export default SingleResult;

 


