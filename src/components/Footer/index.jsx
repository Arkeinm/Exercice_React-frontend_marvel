import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          Made with{" "}
          <a target="_blank" href="https://fr.react.dev">
            React{" "}
          </a>
          at
          <a target="_blank" href="https://www.lereacteur.io">
            {" "}
            Le Reacteur{" "}
          </a>
          by
          <a target="_blank" href="https://github.com/Arkeinm">
            {" "}
            Guillaume PATTI{" "}
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
