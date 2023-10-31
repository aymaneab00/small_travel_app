import { useState } from 'react';
import './App.css';

// export const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];
function App() {
  const [items, setitems] = useState([]);
  function handleadd(newitem) {
    setitems(items => [...items, newitem])

  }
  function modifyitem(id) {
    setitems(items => items.map(item => item.id === id ?{...item,packed:!item.packed} :item))
  }
  function deletteItem(id) {
    setitems(items => items.filter(item => item.id != id))
  }
  return (
    <div className='App'>
      <Header />
      <Form onhandleadd={handleadd} />
      <PackingList item={items} ondeleteitem={deletteItem} onmodify={modifyitem} />
      <Stats />
    </div>
  )

}



////
function Stats() {
  return (
    <footer className='stats'>
      tu as ....
    </footer>
  )
}
function Header() {
  return (

    <h1> 🗽 Travelio 🗽</h1>

  )
}
function PackingList({ item, ondeleteitem, onmodify }) {
  return <ul className='list'>
    {
      item.map(i =>

        <Item item={i} key={i.id} ondeleteitem={ondeleteitem} onmodify={onmodify} />)
    }
  </ul>
}
function Item({ item, ondeleteitem,onmodify }) {

  return (

    <li>
      <input type='checkbox' value={item.packed} onChange={()=>onmodify(item.id)} />
      <span style={!item.packed ? {} : { textDecoration: "line-through", color: 'black' }}>   {item.quantity} {item.description}
        <button onClick={() => ondeleteitem(item.id)}>❌</button> </span>

    </li>
  )
}
function Form({ onhandleadd }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(3);



  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onhandleadd(newItem);
    setDescription('');
    setQuantity('');
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>
        que est ce que tu veux pour votre trip?
      </h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {
          Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>
            {num}
          </option>)
        }

      </select>
      <input type="text" name="" id="" placeholder='Item...' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )


  // const [description, setDescription]=useState("");
  // const [quantity,setQuantity]=useState(1);
  // function handleSubmit(e){
  //     e.preventDefault();
  //     if (!description) return ;
  //     const newItem={description,quantity,packed:false , id:Date.Now()}
  //     console.log(newItem);
  //     setDescription("");
  //     setQuantity(1);
}

// return (
//   <div>
// <form action="" className="add-form" onSubmit={handleSubmit}>
// <h3>quest ce que tu veut paquer ?</h3>  
//   <select name="" id="" value={quantity} onChange={setQuantity((e)=>e.target.value)}>
//   array.from({length:20}, (_,i)=>i+1)
//   </select>
//   <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)} />
//   <button> Ajouter </button>
// </form>
//   </div>
// )
// }



// {list.map((item)=> <Item item={item} key={item.id} />)} 
// {/*on travaille mapping sur list des items donc on put list.map((premieritem)=> </Item item ={premierItem}) every item on count we return an component object with prop item which is has the values of the list */}



export default App;
