import logo from './logo.svg';
import './App.css';
function Header(props) {
  console.log('props', props, props.title);
  return  <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault(); // 기본 event 막기
    props.onChangeMod(); // 밑에서 정의한 함수 실행
  }}>{props.title}</a></h1>
</header>
;
}
function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={event=>{
          event.preventDefault();
          props.onChangeMod(event.target.id); //event.target - 이벤트 발생한 주체
        }}>{t.title}</a>
        </li>);
  }
  return <nav>
  <ol>
    {lis}
  </ol>
  </nav>
  ;
}
function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
;
}
function App() {
  const topics = [
    {id: 1, title: "html", body: "html is ..."},
    {id: 2, title: "css", body: "css is ..."},
    {id: 3, title: "js", body: "js is ..."}
  ]
  return (
    <div>
      <Header title="WEB" onChangeMod={()=>{
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMod={(id)=>{
        alert(id);
      }}></Nav>
      <Article title="welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
