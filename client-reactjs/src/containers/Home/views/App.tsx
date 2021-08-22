import style from "../styles/App.module.scss";

function App() {
  return (
    <div className={style.App}>
      <header className={style["App-header"]}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={style["App-link"]}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
