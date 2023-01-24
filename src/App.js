import logo from './logo.svg';
import { useState } from 'react';
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
          //event.target - 이벤트 발생한 주체, Number-> 숫자로 컴버팅..!!
          props.onChangeMod(Number(event.target.id)); 
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
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event =>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
  ;
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event =>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" value={body} onChange={event=>{
        setBody(event.target.body);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
  ; 
}
function App() {
  //const _mode = useState('WELCOME');
  //const mode = _mode[0]; // mode의 값을 통해 상태값을 읽을 수 있음
  //const setMod = _mode[1]; // setMod로 _mode 값을 변경 할 수 있음 
  const [mode, setMode] = useState('WELCOME'); // 위와 똑같음.
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: "html", body: "html is ..."},
    {id: 2, title: "css", body: "css is ..."},
    {id: 3, title: "js", body: "js is ..."}
  ]);
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i<topics.length; i++) {
      console.log(topics[i].id, id)
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delet" onClick={()=>{
        const newTopics = [];
        for(let i = 0; i<topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
            setTopics(newTopics);
            setMode('WELCOME');
          }
        }
      }}/></li>
    </>;
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body:body};
      const newTopics = [...topics]; // topics를 복제한 복제본
      newTopics.push(newTopic); // 복제된 topics에 원소 추가
      setTopics(newTopics); // setTopics에 복제한 topics로 변경
      setMode('READ'); // 상세보기로 만들기 위한 상태변경
      setId(nextId); // 상세보기를 위한 id값 설정
      setNextId(nextId+1); // 다음 id값을 변경하기 위한 상태변경
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i<topics.length; i++) {
      console.log(topics[i].id, id)
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const updatedTopic ={id:id, title:title, body:body};
      const newTopics = [...topics];
      for(let i = 0; i < newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>;
  }
  return (
    <div>
      <Header title="WEB" onChangeMod={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMod={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
