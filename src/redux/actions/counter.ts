import { INCREASE, DECREASE } from './types';

// 액션 생성함수를 선언합니다
export const increase = () => ({
  type: INCREASE
});

export const decrease = () => ({
  type: DECREASE
});

// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff
// });