import React, { useEffect } from 'react'

const KakaoShareButton = () => {
  useEffect(() => {
    createShareButton()
  }, [])

  const createShareButton = () => {
    
    if(window.Kakao) {
      const kakao = window.Kakao
      
      if(!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY)}

      
      // kakao.Link.createDefaultButton({
      //   container: '#kakao-link-btn',
      //   objectType: 'feed',
      //   content: {
      //     title: '디저트 사진',
      //     description: '아메리카노, 빵, 케익', 
      //     imageUrl://ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ 왜~~~~?감삼다..옂
      //       'https://elb.intotheforest.space/card2.png',
      //     link: {
      //      mobileWebUrl: 'https://developers.kakao.com',
      //       androidExecParams: 'test',
      //      }, //식사하세여네네ㅔㄴ
      //     },
      //     buttons: [
      //     { 
      //       title: '게임 도전',
      //       link: {
      //       mobileWebUrl: 'http://localhost:3000',
      //       },
      //     },
      //     ]
      //     })
      
      // //이미지 업로드하기
      // var files = document.getElementById('file').files;

      // Kakao.Link.uploadImage({
      //   file: files
      //   }).then(function(res){
      //   document.getElementById('uploadUrl').value = res.infos.original.url
      // });
      // //이미지 스크랩하기
      // var url = document.getElementById('url').value;

      // Kakao.Link.scrapImage({
      //   imageUrl: url
      // }).then(function(res){
      //   document.getElementById('scrapUrl').value = res.infos.original.url
      // });

      // //이미지 삭제하기
      // var url = document.getElementById('url').value;

      // Kakao.Link.deleteImage({
      // imageUrl: url
      // });


      kakao.Link.createCustomButton({
        container: '#kakao-link-btn',
        templateId: 45164,
        templateArgs: {
          'name': '윤지',
          'THU': 'https://elb.intotheforest.space/dog2-running-test.png', //ㅎ w잘된ㄷ..
          'a': '나오니????하이염' 
        }      
      })
    }
  }

  return (
    <div>
      <button id="kakao-link-btn">
        카카오로 공유하기
      </button>
    </div>
  )
}

export default KakaoShareButton