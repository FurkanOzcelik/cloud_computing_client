import React, { useState } from 'react';
const lists = [
  { id: 1, title: "Click 1" },
  { id: 2, title: "Click 2" }
];
export default function App() {
  const [hovered, setHovered] = useState(0);
  const [jaroSimilarity, setJaroSimilarity] = useState(0);
  const [jaroSimilar, setJaroSimilar] = useState("");
  const [no, setNo] = useState(0);
  const [category, setCategory] = useState("health personal care");
  const [categories, setCategories] = useState([
    'health personal care', 'low similarity', 'toys games', 'high similarity', 'pet supplies', 'beauty', 'baby products', 'grocery gourmet food'
  ]);
  const [name, setName] = useState("");
  
  const [state, setState] = useState({
    name: "bob",
    color: "blue"
  });

  const handleColor = (row, hovered) => {
    hovered ? setHovered(row.id) : setHovered(-1);
  };

  // "name": "My daughter really wanted this item so we purchased it and 15min after she started",
  // "cat": "toys games"

  function a() {
    const x = fetch(`https://mh957j28nl.execute-api.us-east-1.amazonaws.com/default/JaroWinklerSimilarity?name=${name}&cat=${category}`, {
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
                  setNo(result.no)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  console.log("error", error)
                }
              )
    console.log('ended')
  }

  return (
    <div>
      <p></p>
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
      {jaroSimilarity !== 0 && <p>Most Similar Word: {jaroSimilar}</p>}
      {jaroSimilarity !== 0 && <p>Similarity Rate: {jaroSimilarity}</p>}
      <select id="dropdown" value={category} 
        onChange={(e) => {setCategory(e.target.value)}}>
        {categories.map(category => (
          <option value={category} key={category}>{category}</option>
        ))}
      </select>
      <p>{category}</p>
      <form>
        {/* <label>Enter your name: */}
          <textarea
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{height: 200}}
          />
        {/* </label> */}
      </form>
    </div>
  );
}