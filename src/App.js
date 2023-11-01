import { useState } from 'react';
import './App.css';
import Header from './components/Header';
// export const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ]; 
function App() {
  const [items, setitems] = useState([]);
  function handleadd(newitem) {
    setitems(items => [...items, newitem])
}
function clearall (){
  const confirm = window.confirm('vous etes sure de supprimer tous les taches');

 if (confirm)  setitems([]);
}
  function modifyitem(id) {
    setitems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }
  function deletteItem(id) {
    setitems(items => items.filter(item => item.id !== id))
  }
  return (
    <div className='App'>
      <Header />
      <Form onhandleadd={handleadd} />
      <PackingList item={items} ondeleteitem={deletteItem} onmodify={modifyitem} clearall={clearall} />
      <Stats items={items} />
    </div>
  )

}

 

////
function Stats({ items }) {
  if (!items.length) {
    return (
      <div className='stats'>
        <p>
          ajouter nouveaux taches 🐱‍🏍
        </p>
      </div>
    )
  }
  const numitems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const pourcentage = Math.round((numpacked / numitems) * 100);
  return (
    <footer className='stats'>
      {pourcentage === 100 ? 'vous avez completez tous les taches 👌🏼 '
        : ` tu as ${numitems} taches on votre liste.
     vous avez completez ${numpacked} taches.
     ${pourcentage}% `
      }
 </footer>
  )
}

function PackingList({ item, ondeleteitem, onmodify ,clearall }) {
  const [sortby,setsortby]=useState('input')
  let sorteditems;
  if (sortby==='input') sorteditems= item;
  //⬇ ce code dessus non travaille
   if (sortby ==='description') sorteditems = item.slice().sort((a,b)=>a.description.localCompare(b.description)); //trier par nom alphabetic   // la fonction sort() en js est une fonction qui change au list , donc on cree une copie de notre liste  pour la trier la meme list copie on utilise on "mapping" donc on map a la liste trie
if (sortby==="packed") sorteditems=item.slice().sort((a,b)=>Number(a.packed)-Number(b.packed)); // je dois revisiter section de eviser sur le course pour la fonctin sort reduce ...
// la function sort contenir 2 variable a , b et les compare par la soustraction
  
  return <div className='list'>
   <ul>

    {
      sorteditems.map(i =>
        
        <Item item={i} key={i.id} ondeleteitem={ondeleteitem} onmodify={onmodify} />)
      }
      </ul>
      <div className='actions'>
<select value={sortby} onChange={e=>setsortby(e.target.value)} >
<option value='input'>Trier par date de creation</option>
<option value='description'>Trier par nom descendant</option>
<option value='packed'>Trier par taches non completes</option>
</select>
<button onClick={clearall}>Supprimer tous les taches</button>
      </div>
  </div>
  
}
function Item({ item, ondeleteitem, onmodify }) {

  return (

    <li>
      <input type='checkbox' value={item.packed} onChange={() => onmodify(item.id)} />
      <span style={!item.packed ? {} : { textDecoration: "line-through", color: 'black' }}>   {item.quantity} {item.description}
        <button onClick={() => ondeleteitem(item.id)}>❌</button> </span>

    </li>
  )
}
function Form({ onhandleadd }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);



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
