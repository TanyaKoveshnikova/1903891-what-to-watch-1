import {Film} from '../types/film';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from './store';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute} from '../const';
import {Comment} from '../types/comment';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/userData';
import {NewCommentData} from '../types/new-comment-data';
import {dropToken, saveToken} from '../services/token';
import {redirectToRoute} from './actions';
import {FilmFavoriteListStatus} from '../types/film-list-favorite-status';
import {toast} from 'react-toastify';

export const fetchQuestionAction = createAsyncThunk<Film[], undefined, {
  state: RootState,
  extra: AxiosInstance
}>(
  'data/fetchQuestions',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const getFilmByID = createAsyncThunk<Film, string | undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'data/getFilmByID',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    return data;
  },
);

export const getCommentsByID = createAsyncThunk<Comment[], string | undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'data/getCommentsByID',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postNewCommentsByID = createAsyncThunk<void, NewCommentData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'comments/postNewCommentsByID',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<any>(`${APIRoute.Comments}/${id}`, {
        comment: comment,
        rating: rating
      });
      dispatch(redirectToRoute(`${AppRoute.FilmsList}/${id}`));
      toast.success('Комментарий успешно отправлен.');
    } catch {
      toast.warn('У нас технические плюшки, отправьте комментарий позже.');
    }
  },
);

export const getSimilarFilmsByID = createAsyncThunk<Film[], string | undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'data/getSimilarFilmsByID',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    const similarFilms = data.filter((film) => film.id.toString() !== id);
    return similarFilms;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'dataPage/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: userData} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(userData.token);
    dispatch(getFavoriteFilms());
    dispatch(redirectToRoute(AppRoute.MyList));
    return userData;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'dataPage/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'dataPage/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: userData} = await api.get(APIRoute.Login);
    return userData;
  },
);

export const getFavoriteFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'user/favoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data: favoriteFilms} = await api.get(APIRoute.FavoriteFilms);
    return favoriteFilms;
  },
);

export const postNewStatusFilmInFavoriteList = createAsyncThunk<UserData, FilmFavoriteListStatus, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'user/changeStatusFavoriteList',
  async ({filmStatus, filmId}, {dispatch, extra: api}) => {
    const {data: userData} = await api.post(`${APIRoute.FavoriteFilms}/${filmId}/${filmStatus}`);
    dispatch(getFavoriteFilms());
    return userData;
  },
);

export const getPromoFilm = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance,
}>(
  'film/getPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${APIRoute.PromoFilm}`);
    return data;
  },
);
