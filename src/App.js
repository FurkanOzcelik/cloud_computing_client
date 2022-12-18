import React, { useState } from 'react';
const lists = [
  { id: 1, title: "Click 1" },
  { id: 2, title: "Click 2" },
  { id: 3, title: "Click 3" }
];
export default function App() {
  const [hovered, setHovered] = useState(0);
  const [jaroSimilarity, setJaroSimilarity] = useState(0);
  const [jaroSimilar, setJaroSimilar] = useState("");
  const [state, setState] = useState({
    name: "bob",
    color: "blue"
  });

  const handleColor = (row, hovered) => {
    hovered ? setHovered(row.id) : setHovered(-1);
  };

  function a() {
    console.log("sa")
    for(let i = 0; i < 1; i++){
      const x = fetch("https://mh957j28nl.execute-api.us-east-1.amazonaws.com/default/JaroWinklerSimilarity?name=CRAT", {
                  "method":"POST"
                })
                .then(res => {
                  console.log(res)
                  return res.json()
                })
                .then(
                  (result) => {
                    console.log(result)
                    setJaroSimilarity(result.point)
                    setJaroSimilar(result.string)
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("error", error)
                  }
                )
    }
    console.log('ended')
  }

  return (
    <div>
      {lists.map((list) => (
        <button
          key={list.id}
          onClick={() => a()}
          onMouseEnter={() => handleColor(list, true)}
          onMouseLeave={() => handleColor(list, false)}
          style={{ backgroundColor: list.id === hovered ? "red" : "" }}
        >
          {list.title}
        </button>
      ))}
      {jaroSimilarity !== 0 && <p>Most Similar Word: {jaroSimilar}      Similarity Rate: {jaroSimilarity}</p>}
    </div>
  );
}