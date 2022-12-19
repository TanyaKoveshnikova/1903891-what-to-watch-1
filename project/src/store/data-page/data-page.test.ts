import {dataPageStore} from './data-page.reducer';
import {AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {makeFakeUser} from '../../utils/moks';

const initialDataPageState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  avatarUrl: null,
  error: null
};

const fakeUser = makeFakeUser();

describe('Reducer: data-page', () => {

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" & avatar shoud be not null if checkAuthAction fulfilled', () => {
      const avatarUrl = fakeUser.avatarUrl;
      expect(dataPageStore.reducer(initialDataPageState, {type: checkAuthAction.fulfilled.type, payload: {avatarUrl: avatarUrl}}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          isDataLoading: false,
          avatarUrl: avatarUrl,
          error: null
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(dataPageStore.reducer(initialDataPageState, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction test', () => {
    it('should update isDataLoading to "false" &  authorizationStatus to "Unknown" if loginAction pending', () => {
      expect(dataPageStore.reducer(initialDataPageState, {type: loginAction.pending.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Unknown,
          isDataLoading: false,
          avatarUrl: null,
          error: null
        });
    });
    it('should update authorizationStatus to "AUTH" & avatarUrl !== null & isDataLoading to "true" if loginAction fulfilled', () => {
      const avatarUrl = fakeUser.avatarUrl;
      expect(dataPageStore.reducer(initialDataPageState, {type: loginAction.fulfilled.type, payload: {avatarUrl: avatarUrl}}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          isDataLoading: true,
          avatarUrl: avatarUrl,
          error: null
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(dataPageStore.reducer(initialDataPageState, {type: loginAction.rejected.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          isDataLoading: false,
          avatarUrl: null,
          error: null
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      const avatarUrl = fakeUser.avatarUrl;

      const stateLogout = {
        authorizationStatus: AuthorizationStatus.Auth,
        isDataLoading: true,
        avatarUrl: avatarUrl,
        error: null
      };
      expect(dataPageStore.reducer(stateLogout, {type: logoutAction.fulfilled.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          isDataLoading: true,
          avatarUrl: null,
          error: null
        });
    });
  });

  it('without additional parameters should return initial state', () => {
    expect(dataPageStore.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialDataPageState);
  });

  it('when login pending isDataLoading false', () => {
    expect(dataPageStore.reducer(initialDataPageState, {type: loginAction.pending.type}))
      .toEqual(initialDataPageState);
  });

  it('login fulfilled data change', () => {
    expect(dataPageStore.reducer(initialDataPageState, {type: loginAction.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        isDataLoading: true,
        avatarUrl: null,
        error: null
      });
  });
});
