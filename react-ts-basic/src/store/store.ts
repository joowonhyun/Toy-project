import { configureStore, createSlice } from '@reduxjs/toolkit'

const items = createSlice({
  name : 'items',
  initialState : [
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ],
  reducers: {
    onAdd(state, action) {
      state.push({
        id: state.length,
        text: action.payload,
        checked: false,
      });
    },
    onRemove(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    onToggle(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state[index].checked = !state[index].checked;
    },
  }
})
export const { onRemove, onToggle, onAdd } = items.actions

export default configureStore({
  reducer: {
    items : items.reducer
  }
})