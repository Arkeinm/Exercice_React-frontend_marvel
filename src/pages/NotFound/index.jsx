import "./notfound.css"

const NotFound = () => {
  return (
    <main className="main-notfound">
      <div className="main-notfound__container container">
        <div>
          <img
            className="main-notfound__img"
            src="/img/background-404.png"
            alt=""
          />
        </div>
        <p className="main-notfound__paragraph">You obvsiously don't understand Groot, just <a href="/">click here</a></p>
      </div>
    </main>
  );
};

export default NotFound;
