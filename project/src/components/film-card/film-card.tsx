import '../../css/main.min.css';
import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import {AppRoute} from '../../const';
import PreviewVideoPlayer from '../video-player/preview-video-player';

type FilmCardProps = {
  film: Film,
  isActive: boolean,
  onMouseOverHandler: (e: any) => void,
  onMouseLeaveHandler: (e: any) => void
}

function FilmCard(props: FilmCardProps) {
  const {film, onMouseOverHandler, onMouseLeaveHandler, isActive} = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
      <div className="small-film-card__image">
        {
          isActive ? (<PreviewVideoPlayer videoLink={film.filmCardInfo.previewVideoLink} posterImage={film.filmCardInfo.posterImage} isSound={false}/>)
            : (<img src={film.filmCardInfo.posterImage} alt={film.filmCardInfo.name} width="280" height="175"/>)

        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FilmsList}/${film.id}`}>{film.filmCardInfo.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
