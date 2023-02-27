import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 1. api : db가 있음..
// 2. db에서 data를 가져온다. useEffect 데이터 가져올 때 react에서 
// 3. 가져온 data를 react로 뿌려준다.

const UL = styled.ul`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
list-style: none;
padding: 10px;
li {
  display: block;
}
img {
  max-width: 100%;
}

@media (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
}
`

const H1 = styled.h1`
text-align: center;
`
const SEARCH = styled.div`
text-align: center;
padding: 20px;
`




function App() {
  const [pic, setPic] = useState([]);
  const [s, setS] = useState('stars');
  const getData = async () => {
    const data = await fetch(`https://pixabay.com/api/?key=31535124-c7dd35e872ae67c5628a6a1fb&q=${s}&image_type=photo`)
      .then(r => r.json());
    console.log(data, data.hits, data.hits[0].id);
    setPic(data.hits);

  }

  useEffect(() => {
    getData();
  }, [s]);





  return (

    <>
      <H1>let's PIC : 1개 이미지</H1>

      <SEARCH>SEARCH : <input onChange={(e) => setS(e.target.value)} value={s} /></SEARCH>
      <UL>
        {
          pic.map(it => {
            return (
              <li key={it.id}>
                <img src={it.largeImageURL} />
                <div>{it.id}</div>
                <div>{it.tags}</div>
              </li>
            )
          }
          )
        }

      </UL>
    </>
  );
}

export default App;
