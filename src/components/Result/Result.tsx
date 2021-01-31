import React, { useState } from "react";
import { useSelector } from "react-redux";
import { roomSocket } from "../../utils/socket";
import KakaoShareButton from "./KakaoShareButton";
import "./Result.css";

function Result() {
  const roomCode = useSelector(
    (state: RootState) => state.roomReducer.roomCode
  );
  const [scoreList, setScoreList] = useState([]);

  roomSocket.listenResult((userList: any) => {
    setScoreList(userList);
  });

  return (
    <div style={{ position: "relative" }}>
      <div className="kakao_share">
        <KakaoShareButton />
      </div>
      {scoreList.map((user: any, idx: number) => (
        <div
          className="MRcontainer"
          style={{
            position: "relative",
            left: `${16.5 + idx * 20.3}%`,
            top: `${-(idx * 165)}px`,
          }}
          key={idx}
        >
          <div className="MRcontent">닉네임: {user.nickName}</div>
          <div className="MRcontent">점수: {user.gameResult.score}</div>
          <div className="MRcontent">스테이지: {user.gameResult.stage}</div>
          <div className="MRcontent">
            서브 캐릭터: {user.gameResult.squi + user.gameResult.bird}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result;

// function drawImg(imgData) { console.log(imgData); return new Promise(function reslove() { var canvas = document.getElementById('canvas'); var ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); var imageObj = new Image(); imageObj.onload = function () { ctx.drawImage(imageObj, 10, 10);  }; imageObj.src = imgData;  }, function reject() { }); } function saveAs(uri, filename) { var link = document.createElement('a'); if (typeof link.download === 'string') { link.href = uri; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); } else { window.open(uri); } }

// console.log(document.getElementsByClassName("capture"))
// html2canvas(document.getElementsByClassName("capture"))
//   .then(function (canvas) {
//     drawImg(canvas.toDataURL("image/jpeg"));
//     saveAs(canvas.toDataURL(), "file-name.jpg");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });