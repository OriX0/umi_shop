/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-07 19:46:22
 */
import { history } from 'umi';
import { fakeAccountLogin, clearAndLoginOut } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === undefined) {
        yield put({
          type: 'changeLoginStatusOri',
          payload: response,
        }); // Login successfully
        message.success('🎉 🎉 🎉  登录成功！');
        history.replace('/'); // 跳转到首页
      }
    },

    *logout({ _ }, { call, put }) {
      let loginM = message.loading('loding...');
      const response = yield call(clearAndLoginOut);
      if (response == '') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        history.replace('/user/login');
        message.success('退出成功');
      }
      loginM();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    changeLoginStatusOri(state, { payload }) {
      localStorage.setItem('access_token', payload.access_token);
      return { ...state };
    },
  },
};
export default Model;
