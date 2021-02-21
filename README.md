# 🌲🌳 Into the Forest 🌳🌲

<img src="https://user-images.githubusercontent.com/63646254/108619351-97132580-7467-11eb-84c9-db3ff43cd174.gif" alt="2" width="560" height="280">


Into the Forest는 횡스크롤 러닝 액션 게임으로 길잃은 강아지가 집을 찾아가는 게임입니다. <br>
가볍게 솔로 모드로 플레이하시거나, 친한 친구들과 멀티 모드로 추억을 남겨보세요!
* 배포 사이트 : <a href="https://intotheforest.space">https://intotheforest.space</a>
* 클라이언트: <a href="https://github.com/codestates/Into-the-Forest-client">https://github.com/codestates/Into-the-Forest-client</a>
* 서버: <a href="https://github.com/codestates/Into-the-Forest-server">https://github.com/codestates/Into-the-Forest-server</a>
<br/>

# 🐾 시연 영상 

![stage1](https://user-images.githubusercontent.com/63646254/108600561-232b3b80-73db-11eb-92da-102f7a70925e.gif)

![stage2](https://user-images.githubusercontent.com/63646254/108600763-5621ff00-73dc-11eb-8ab3-242cee6e397a.gif)

![stage3](https://user-images.githubusercontent.com/63646254/108600776-633eee00-73dc-11eb-94bc-e0160cd0c94b.gif)



<br/>

# 🐾 목차

* [팀원 소개](#-팀원-소개)
* [개발 기간](#-개발-기간)
* [스택](#-스택)
* [스택 선정 이유](#-스택-선정-이유)
* [워크플로우](#-워크플로우)
* [기능](#-기능)
* [배포](#-배포)
* [회고](#-회고)

<br/>



<br/>

# 🐾 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Youn-Ji">
          <sub>
            <b>송윤지</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🏴 Backend</strong>
      </td>
    </tr>
     <tr>
      <td align="center">
        <a href="https://github.com/urusara13">
          <sub>
            <b>안경훈</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🏁 Frontend</strong>
      </td>
    </tr>
      <td align="center">
        <a href="https://github.com/mnmms">
          <sub>
            <b>이소정</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🏁 Frontend</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/jaejin1027">
          <sub>
            <b>이재진</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🏁 Frontend</strong>
      </td>
    </tr>
    </tr>
  </tbody>
</table>


<br/>

# 🐾 개발 기간 

📆 1주차 1/6 - 1/13
- 프로젝트 기획  및 기술 스택 검토

📆 2주차 1/14 ~ 1/22
- React, Redux, Phaser, NestJS  

📆 3주차 1/23 ~ 1/29
- socket.io + WebRTC 채팅, 화상 구현  

📆 4주차 1/30 ~ 2/5
- CSS 마무리 + JWT   

<br/>

# 🐾 스택

### FRONT
![](https://img.shields.io/badge/FRONT-Typescript-informational?style=for-the-badge&logo=TypeScript)

![](https://img.shields.io/badge/FRONT-React-61DAFB?style=for-the-badge&logo=React) ![](https://img.shields.io/badge/FRONT-React--hook-61DAFB?style=for-the-badge&logo=React) 

![](https://img.shields.io/badge/FRONT-redux-lightgreenm?style=for-the-badge&logo=redux) 

![](https://img.shields.io/badge/FRONT-phaser-dodgerblue?style=for-the-badge&logo=appveyor) 

![](https://img.shields.io/badge/FRONT-socket.io-lightgrey?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij48cGF0aCBkPSJNOTYuNDQ3IDcuMzgyYzMyLjI2Ny04LjI3NSA2Ny45MjktMy40NTMgOTYuMzg2IDE0LjExIDM1Ljg0IDIxLjQzMyA1OS4yMzggNjEuOTc2IDU5LjgzMyAxMDMuNzEgMS4zMSA0Mi4xNS0yMC42NTkgODMuOTQ0LTU1Ljk2MyAxMDYuODY1LTM5LjI5MyAyNi40MzMtOTMuNjQ4IDI3LjQ0Ni0xMzMuNzc1IDIuMzIyLTQwLjktMjQuNDEtNjQuNzc0LTczLjY0NS01OC42NDEtMTIwLjkxNiA0Ljk0LTQ5Ljk1IDQzLjUyLTk0LjAwNSA5Mi4xNi0xMDYuMDl6IiBmaWxsPSIjMDEwMTAxIi8+PHBhdGggZD0iTTkxLjUwNSAyNy44MDNjNjAuOTY0LTI0LjQxIDEzNS43NCAyMC42NTggMTQyLjA1IDg2LjAyOCA5LjgyNCA1OC44Mi0zOC45OTUgMTE4LjU5My05OC41OSAxMjAuMzItNTYuNjc3IDUuNjU2LTExMS40NDktNDIuMzktMTEzLjA1Ni05OS4zMDQtNC4yMjctNDYuMDggMjYuMTM2LTkxLjgwMyA2OS41OTYtMTA3LjA0NHoiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNOTcuNjM3IDEyMS42OWMyNy4zMjctMjIuMzI2IDU0LjA1OC00NS40MjYgODEuOTgtNjcuMDk3LTE0LjY0NiAyMi41MDUtMjkuNzA4IDQ0LjcxMS00NC4zNTQgNjcuMjE1LTEyLjU2Mi4wNi0yNS4xMjMuMDYtMzcuNjI2LS4xMTl6TTEyMC43MzcgMTM0LjEzMmMxMi42MjEgMCAyNS4xODMgMCAzNy43NDUuMTc5LTI3LjUwNSAyMi4yMDYtNTQuMTE3IDQ1LjQ4NC04Mi4wOTkgNjcuMDk2IDE0LjY0Ni0yMi41MDUgMjkuNzA4LTQ0Ljc3IDQ0LjM1NC02Ny4yNzV6IiBmaWxsPSIjMDEwMTAxIi8+PC9zdmc+) 


### BACK
![](https://img.shields.io/badge/BACK-Typescript-informational?style=for-the-badge&logo=TypeScript)

![](https://img.shields.io/badge/BACK-nestjs-red?style=for-the-badge&logo=nestjs)

![](https://img.shields.io/badge/BACK-mysql-cornflowerblue?style=for-the-badge&logo=mysql)

![](https://img.shields.io/badge/BACK-sequelize-deepskyblue?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPiAgPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgeD0iMCIgeT0iMCIKICAgIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQlFBQUFBVUNBWUFBQUNOaVIwTkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUEKQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINVFFTERqWXVQMmcva0FBQUJFQkpSRUZVT010MWxFdHNsR1VVaHAvegpmZi9NUDVlV21iWjBiS1VRV3lnV05WeE1ORXBCRnNyQ2FJakVEVHMzSmlhR1JNUEdoVmlWeEJnWEdvMlN1RE9SUkpERVNBUWhwRXFwClhDb2hwTU5WUzlGU2d2UTZuYlp6YWVlZitmL2pnckZBd0cvOW5pZmZPZWM5ci9BL3p4N01neGlMWCtsRWd5N0FRZVJEclBNYmdmcisKbHBvSDFwbjdRRDhYWVY0aENGcXBlQjhSQlB0UWZSN1ZUUVM2bDByNVl6Um9rM09LUFZTOER5Z0xvTU5sS09YQk92VUV3VGJRN2FoMgpWRFhacXF3T1VKQUJSSFpqekhjRWxTbENOZmd2aGFwQVZleFBPUkFUSWZBM2crNUF0Uk1JQVhPSW5FWmtFQWlqTEFkOUd0VW9VRUhrCkpDS2ZJYVliMVhsL1N5M0NjY1dkeUR4UkNZZmVJZEJYUUd1cTRyVGpsYnQ5eDY1Ulk1NVRFV1BMM2htbldEam5MVXB1UW5WZGRhNTUKRlhQQXpVMS9NdmZZMGt1V3R6Nmc2ZXlWTGxSZnIwVGNzQnB6SFdPT0lKSjM4L2wxc2V6MEpqWEdEV2NuUWczbno3UktwUkxNUGJUawptb2hjVkpHRTlVcXB1b0gwNnRUdngveXBaNTQ5WWp2R2s5amE1TmJvOU15VGJuRnVVR0JQWU0zTHZyWHJLeEczSlRTYmxZYkJBVTBNCnBNbTFkc2hNKytQTEVGbnRGQXZ4UlVOWDl6ZWRQdHJja082cmQ3T1Q2ZFNQK3c0NTlzUjV5aDFyUkZTSlRjOWtvN081cUJlTnRPVWEKNnpVMGRsMWpJemRrZHVVYThWdmJDSmNDYWpKWmxVS0dodjVUN2ZGYnd5bmpsV1pVQkJXRHVoRWMvZUViT05vaktLZ0lxRXE0VUtSeApja3pzNkZWR043NUlic2xTVklUNDZFMFcvM2xCWXRmNk5UUTFCdGFpWW00dkhnaEVjQ3I5WTZCVit5amlSeUpwUlNmQ3hkbEdvNGJrCmFJWlFPY0JtYmxCM3ZnK0pOV0I4WDhvMWkzSml6QVZieUsxZE1LRXFqamYrbDFpMGFuREZpMGRUK2Jwa0xKU0lFWXVGQ0ZkOEVqZHYKRWIxeUNqdWJJWjlhUm1INVNrcUpwRk03UEZoYmQrbnM3YzZxcm5aUTc0N0JSVFEybFgwNFBKdUxGNUkxaWxla0hIWEZVWXRhaCtLeQpkb290S3pUUU1xbSs3cWc3UGRWMmQ4dXFBWTRUaWFMemhZV0xVY1MzNVFwMXc5ZkZqZzB6M3JtS1N0aGxKaGxCL0RLSmtUR0pEVjFXCm04dWcxdnIzbnAxaUhHTUIrVytHRFFoL0lMSlhrYnhnZzhUSU9QR3ByTWIvR2RMbTR3ZHhKMGRRWThvcTBpTXdCTHI0N2pOMnhIRkIKY3Q3dFgrdHlBbjBmTVhzRXVvUGFoa2RGNWUxWUp1TkdyMTFSNDgyajgva0RJbkpHUkpwVjlVMmdwUXIwakRqWXhGT3ZncGdoaEJxZwpEV2dDM2FqaFNHTlFVOThMWEpUQWJ3bE4zaXdiYi81N1V5cGNrRkp4QzdBVlNBSTVrUDBpZkNGaUprUlZhZC9aQzRpckdteEdkUWZvCmhtbzRGQkU1TEdYdmw5aWxubHFaeTIwQVhnRGlRQVU0aWNpbmduU0RsdEk5dSsvRTE0cXUwMmg1RGpHMlRqWFlocklkZEJXSWlGZWMKaUYzc1VmR0tLUkFGQmtDK0VwRzlxc0dVc1dINmYvMzgzanhjQUw5M2tyVzdPdW5mZWZ3UlZOOEFYalB6aGVibzVWNmtWQndEK1ZhRQpyK1BKcHI4TE0rT2tqMzM1NElDOUQveHVMNGl4U3JEZTVMTmRrWUUrYTR1enU3RE9DVlQ5ZE05WEQ2ejdGMDRZQWVmT0h2T3JBQUFBCkpYUkZXSFJrWVhSbE9tTnlaV0YwWlFBeU1ESXhMVEF4TFRFeFZERTBPalUwT2pRMUt6QXdPakF3RnVCK1BRQUFBQ1YwUlZoMFpHRjAKWlRwdGIyUnBabmtBTWpBeU1TMHdNUzB4TVZReE5EbzFORG8wTlNzd01Eb3dNR2U5eG9FQUFBQUFTVVZPUks1Q1lJST0iIC8+Cjwvc3ZnPgo=)

![](https://img.shields.io/badge/BACK-socket.io-lightgrey?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij48cGF0aCBkPSJNOTYuNDQ3IDcuMzgyYzMyLjI2Ny04LjI3NSA2Ny45MjktMy40NTMgOTYuMzg2IDE0LjExIDM1Ljg0IDIxLjQzMyA1OS4yMzggNjEuOTc2IDU5LjgzMyAxMDMuNzEgMS4zMSA0Mi4xNS0yMC42NTkgODMuOTQ0LTU1Ljk2MyAxMDYuODY1LTM5LjI5MyAyNi40MzMtOTMuNjQ4IDI3LjQ0Ni0xMzMuNzc1IDIuMzIyLTQwLjktMjQuNDEtNjQuNzc0LTczLjY0NS01OC42NDEtMTIwLjkxNiA0Ljk0LTQ5Ljk1IDQzLjUyLTk0LjAwNSA5Mi4xNi0xMDYuMDl6IiBmaWxsPSIjMDEwMTAxIi8+PHBhdGggZD0iTTkxLjUwNSAyNy44MDNjNjAuOTY0LTI0LjQxIDEzNS43NCAyMC42NTggMTQyLjA1IDg2LjAyOCA5LjgyNCA1OC44Mi0zOC45OTUgMTE4LjU5My05OC41OSAxMjAuMzItNTYuNjc3IDUuNjU2LTExMS40NDktNDIuMzktMTEzLjA1Ni05OS4zMDQtNC4yMjctNDYuMDggMjYuMTM2LTkxLjgwMyA2OS41OTYtMTA3LjA0NHoiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNOTcuNjM3IDEyMS42OWMyNy4zMjctMjIuMzI2IDU0LjA1OC00NS40MjYgODEuOTgtNjcuMDk3LTE0LjY0NiAyMi41MDUtMjkuNzA4IDQ0LjcxMS00NC4zNTQgNjcuMjE1LTEyLjU2Mi4wNi0yNS4xMjMuMDYtMzcuNjI2LS4xMTl6TTEyMC43MzcgMTM0LjEzMmMxMi42MjEgMCAyNS4xODMgMCAzNy43NDUuMTc5LTI3LjUwNSAyMi4yMDYtNTQuMTE3IDQ1LjQ4NC04Mi4wOTkgNjcuMDk2IDE0LjY0Ni0yMi41MDUgMjkuNzA4LTQ0Ljc3IDQ0LjM1NC02Ny4yNzV6IiBmaWxsPSIjMDEwMTAxIi8+PC9zdmc+)


<br/>

# 🐾 스택 선정 이유


### Why TypeScript?
게임을 구상할 때 다양한 이벤트와 오브젝트의 상호작용을 계획했는데 이벤트가 디테일해질 수록 데이터 또한 늘어났습니다. 모든 데이터를 오류 없이 안정적으로 관리하기 위해서 TypeScript를 선택하게 되었습니다.
또한 저희 프로젝트는 3명의 프론트엔드 개발자가 있습니다. 개별적으로 코드를 치며 발생할 수 있는 사소한 타입 오류를 TypeScript를 도입해 방지하고자 하였습니다. 
JavaScript의 경우 타입 오류를 검사하기 위해서 매번 실행해야하지만 TypeScript는 실행 이전에 코드 단위에서 오류를 잡아낼 수 있기 때문에 속도감 있는 에러 핸들링을 할 수 있을 것이라 생각했습니다.


### Why Phaser?
Phaser는 2D 비디오 게임을 만들기 위한 프레임 워크입니다. HTML5 Canvas를 사용하여 게임을 렌더링하고 순수 JavaScript를 사용하여 게임을 실행합니다.
물론 Canvas를 사용하여 게임을 구현할 수 있겠지만 Phaser를 도입한 이유는 한정된 시간 내에서 게임 설계에 더 집중하고 싶었기 때문입니다.
또한 이번 프로젝트에서는 지금껏 사용한 적이 없는 새로운 스택을 많이 도입했습니다. 그로 인한 부담감을 최대한 줄여내고 싶었습니다.
가장 핵심적인 것은 Typescript의 Class를 사용해서 Phaser에 접근을 쉽게 할 수 있었고 게임 개발에 자잘한 오류를 잡을 수 있다는 것입니다.
실제 개발에서도 Typescript와 Phaser를 연동해서 사용한 것이 개발에 큰 도움이 됐습니다.

### Why NestJS?
NestJS는 Express 다음으로 가장 주목받는 NodeJs 프레임워크입니다. 확실한 틀(controller, module, service)이 정해져 있고 공식문서가 자세하기 때문에 러닝커브가 완만할 것으로 예상되었습니다. 더하여 TypeScript를 완벽하게 지원합니다. 백엔드에서 타입스크립트를 깊게 이해해 볼 수 있는 시간이 될 수 있을 뿐만 아니라 개발자 경험을 위해 좋은 도전이 될 것이라 생각했습니다.


<br/>


# 🐾 워크플로우
![Group 2](https://user-images.githubusercontent.com/63646254/108616312-ba31db00-744f-11eb-8742-b8638904dfaf.png)

<br/>

# 🐾 기능


<table>
  <tbody>
   <tr>
    <td align="center"> <img src="https://user-images.githubusercontent.com/63646254/108621915-fd547400-7478-11eb-8a1c-724b49ebd26d.png" alt="1" width="444" height="265">
      <br>
     게임은 싱글모드와 멀티모드로 나뉘어져 있습니다.<br>
싱글모드는 혼자, 멀티모드는 최대 4인의<br> 유저들과 화상, 채팅으로 소통하며 게임을 즐길 수 있습니다.
     </td>
    <td align="center"> <img src="https://user-images.githubusercontent.com/63646254/108621920-034a5500-7479-11eb-8f94-348ba844673f.png" alt="2" width="444" height="265">
      <br>
      유저는 3가지 캐릭터 중 하나를 선택해 플레이할 수 있습니다
      <br>
      <br>
      <br>
    </td>
   </tr> 
   <tr>
     <td align="center"><img src="https://user-images.githubusercontent.com/63646254/108621926-0c3b2680-7479-11eb-9af0-1f588b6f3f6e.png" alt="3" width="444" height="265">
       <br>
     스페이스바 혹은 점프 버튼 클릭 시 점프합니다. <br>시간이 지날 수록 체력이 감소하고 포션 획득 시에만 <br>체력을 회복합니다
       <br>
     </td>
     <td align="center"> <img src="https://user-images.githubusercontent.com/63646254/108621929-0e04ea00-7479-11eb-94b0-3967e40258c0.png" alt="4" width="444" height="265">
       <br>
       게임 스테이지는 총 3개입니다. 각종 포션, 숲 속 친구들, 버섯, <br>몬스터가 등장하며 버섯과 몬스터를 피해 숲 속 친구들을 모아<br> 스테이지를 모두 통과하면 게임을 클리어할 수 있습니다.
       <br>
     </td>
  </tr>
    <tr>
     <td align="center"><img src="https://user-images.githubusercontent.com/63646254/108625080-30ecc980-748c-11eb-91b9-822ecaf300a7.png" alt="5" width="444" height="265">
       <br>
       스테이지를 통과할 때마다 미니게임을 즐길 수 있습니다. <br>카드 뒤집기 게임과 두더지 잡기 게임이 있으며 추가 점수를<br> 획득할 수 있습니다.
       <br>
     </td>
     <td align="center"> <img src="https://user-images.githubusercontent.com/63646254/108625083-34805080-748c-11eb-815d-f953e20873ca.png" alt="6" width="444" height="265">
       <br>
       게임 종료 후 자신이 획득한 스코어로 <br>닉네임 및 랭킹을 등록 할 수 있습니다.
       <br>
       <br>
     </td>
  </tr>
    <tr>
     <td align="center"><img src="https://user-images.githubusercontent.com/63646254/108625084-3813d780-748c-11eb-9fce-19a17239c0dd.png" alt="7" width="444" height="265">
       <br>
       방을 만들면 대기실에서 실시간 화상 채팅을 즐길 수 있습니다. <br>모든 멤버가 ready를 하면 방장이 게임을 시작할 수 있습니다.
       <br>
     </td>
     <td align="center"> <img src="https://user-images.githubusercontent.com/63646254/108625088-3ba75e80-748c-11eb-8d4a-280b6b23df54.png" alt="8" width="444" height="265">
       <br>
     멀티모드에서 함께 게임을 즐기고 각자의 점수를 공유합니다.
       <br>
       <br>
     </td>
  </tr>
  </tbody>
</table>



<br/>

# 🐾 배포
![Untitled](https://user-images.githubusercontent.com/63646254/108617703-e2273b80-745b-11eb-8efd-8c038cff712e.png)
멀티모드에서는 화상 채팅 기능을 구현했는데 이 과정에서 HTTPS가 필요하다는 것을 알게 됐습니다. WebRTC에서 제공하는 getUserMedia는 보안상의 이유로
HTTPS를 사용하지 않으면 Media Resource에 대한 접속 권한을 얻지 못하게 됩니다.
다만 PeerJS를 통해 피어 간의 연결이 성립된 이후엔(signaling) RTCDataChannel 이 아닌 WebSocket을 통해 데이터를 주고받게 했습니다.
HTTPS의 구성은 ClondFront-S3와 ELB-EC2로 구성되어 있는데 HTTPS를 통해서 웹캠의 비디오와 오디오 스트림에 접근하고 피어 연결이 성립되면 그때 ELB의 TCP 리스너를 통해 WebSocket으로 데이터 스트림을 주고받는 방식으로 구현하였습니다.

<br/>

# 🐾 회고

### <경훈>

화상 구현하는데 가장 어려웠던 것은 바로 테스트가 쉽지 않다는 점이었습니다.
다른 네트워크에 있는 사용자와 통신을 하는 것이 중요한데 배포도 안 된 상태의 로컬 환경에서의 테스트는 큰 의미가 없었고
테스트 함수를 작성하려고 해도 어떻게 다른 미디어 스트림을 얻고 그것을 다른 네트워크로부터 전송받을지 전혀 감이 오지 않았습니다.
심지어 Code Pipeline과 같은 배포 자동화가 적용된 것도 아니어서 초기 예상과 달리 매우 험난한 길이었습니다.
어떻게든 팀원과 협력하여 어느 정도 구현은 하였지만 STUN, TURN 네트워크의 방화벽 관련 이슈는커녕 디버깅조차 버거웠습니다.
조금 더 많은 것을 해보지 못한 아쉬움이 남았지만 좋은 경험이 됐다고 생각합니다.

### <윤지>

서버와 클라이언트의 Socket 통신을 구현할 때 어려움이 있었습니다. 공식문서를 보고 따라 했지만 동작하지 않는 것을 보고 새로운 스택을 사용하는 데 있어서 회의감이 들었습니다. Nestjs , typescript는 처음 써보았고 관련 레퍼런스를 찾는 것도 쉽지 않았기에 여기서 express를 사용해야 하나 고민했습니다. 그러나 고생 끝에 디펜던시 버전 문제였다는 것을 알게 되었습니다. 서버와 클라이언트의 socket.io 버전을 맞춰주니 아주 잘 통신되는 것을 확인할 수 있었습니다. 이 일을 통해 개발에 있어 디펜던시 버전 또한 굉장히 중요하다는 것을 다시 한번 깨닫고, 주의 깊게 살펴야 한다는 것을 배웠습니다.

### <소정>

### <재진>

주제가 게임이기 때문에 phaser나 tiled map은 우리 프로젝트에는 도움이 될지 모르지만 이게 과연 취업에 도움이 될까 하는 의구심이 항상 들었습니다. 기존 웹 스택 공부와 병행하며 게임 프레임워크를 공부하고 적용하는 것이 쉽지 않았습니다. 
캐릭터 선택 클릭 시 고정이 안 되는 부분, 로딩 페이지 구현 시 강아지가 숲과 만나는 부분 등 기능과 css 애니메이션이 혼합된 부분에서 예상치 못한 버그가 많아 고치는 데 시간이 오래 걸렸습니다.  
하지만 redux를 배우고 적용해 볼 수 있었고  react-table을 이용한 pagenation 구현, styled component 등 한 번도 사용해보지 않았던 새로운 기능들을 추가하고 적용하는 부분 등을 통해 프론트엔드에 필요한 많은 것들을 배울 수 있었던 프로젝트였다고 생각합니다. 

<br/>


# For project wiki

[https://github.com/codestates/Into-the-Forest-client/wiki](https://github.com/codestates/Into-the-Forest-client/wiki)
