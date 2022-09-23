import SvgGeneralScreen from '../../svg/svg-general-screen.svg';

function FilmCardButton() {
  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref={`${SvgGeneralScreen}#play-s`}/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={`${SvgGeneralScreen}#add`}/>
        </svg>
        <span>My list</span>
        <span className="film-card__count">9</span>
      </button>
      <a href="add-review.html" className="btn film-card__button">Add review</a>
    </div>
  );
}

export default FilmCardButton;