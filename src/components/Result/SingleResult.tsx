import React, { useState, useEffect }from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer' 
import { useHistory } from "react-router-dom";
import { useTable, usePagination } from 'react-table';
import { useDispatch } from 'react-redux';
import axios from "axios";
import styled from 'styled-components';
import './SingleResult.css';
import moment from 'moment';
import jwt from 'jsonwebtoken'
require('dotenv').config()

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    margin: 0 auto;
    width:100%;

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
      padding: 10px 20px;
      border-bottom: 0.5px solid gray;

      :last-child {
        border-right: 0;
      }
    }

    th {
      color: red;
    }
  }

  .pagination {
    padding-top: 0.5rem;
  }
`
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 7 },
  },
  usePagination
  )

  // Render the UI for your table
  return (
    <>
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
        {page.map((row, i) => {
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

    <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
      </div>
    </>
  )
}


function SingleResult() {
    const dispatch = useDispatch()

    const gameDataFinal = useSelector((state: RootState) => state.singleReducer.gameData, shallowEqual)
    const accessToken = sessionStorage.getItem('token')
    const [posts, setPosts] = useState([])
    const [rankOn, setRankOn] = useState(false)

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URL}/rank/load`,
        {
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    let obj = {
        score: gameDataFinal.score,
        stage: gameDataFinal.stage + 1,
        subcha: gameDataFinal.bird ? gameDataFinal.bird : 0 + gameDataFinal.squi ? gameDataFinal.squi : 0,
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
            const rankToken = jwt.sign({data: newGameDataFinal, babo: 'e gun mol rat zzi' }, process.env.REACT_APP_SECRET_RANK as string)
            await axios.post(`${process.env.REACT_APP_URL}/rank/reg`, rankToken,
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
                  .get(`${process.env.REACT_APP_URL}/rank/load`,
                  {
                    headers: {"Authorization": `Bearer ${accessToken}`}
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
              Header: '#',
              id: 'index',
              accessor: (row) => row.index+1 // 'index' is undefined
            },

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
            {
              Header: '생성일',
              id: "createdAt",
              accessor: (d) => {
                return moment(d.createdAt)
                  .local()
                  .format("YY-MM-DD  HH:mm")
              }
            }
          ],
        },
      ],
      []
    )

    const onChoiceModeBack = () => {
      window.open('/', '_self')
     }
   
    let myIndexedData = posts.map((el,index) => ({index, ...el}))

    return !rankOn ? (
      <div className="singleResultScreen">
        <div className="singleResultLayout">
         <div className="singleRankTables">
          <Styles>
            <Table columns={columns} data={myIndexedData} />
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
        <div className="singleResultLayout">
        <div className="singleRankTables">
          <Styles>
            <Table columns={columns} data={myIndexedData} />
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

 


