    import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [age, setAge] = useState(null)
  const [id, setId] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id)
    if (dt !== undefined) {
      setIsUpdate(true)
      setId(id)
      setfirstName(dt[0].firstName);
      setlastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure to delete this item')){
        const dt = data.filter(item => item.id !== id);
        setData(dt)
      }
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';
    if (!firstName)
      error += "First name is required, ";
    if (!lastName)
      error += "Last name is required, ";
    if ((!age || age <= 0) || age > 100)
      error += "Age is required. ";
    if (error === '') {
      const dt = [...data];
      const newObj = {
        id: data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      dt.push(newObj);
      setData(dt);
      handleClear();
    }
    else {
      alert(error)
    }
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);
    const dt = [...data]
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0)
    setfirstName('');
    setlastName('');
    setAge('');
    setIsUpdate(false)
  }
  return (
    <div className="App" style={{ minHeight: "100vh", height: '100%', backgroundImage: "url('https://cdn.wallpapersafari.com/55/66/sVWkHS.jpg')" }} >
      <div className=''>
        <div className='py-3 mx-5 d-flex justify-content-center ' >
          <div >
            <label>First Name : &nbsp;
              <input type='text' placeholder=' Enter First Name' onChange={(e) => setfirstName(e.target.value)} value={firstName} />
            </label>
          </div>
          <div className='ms-2'>
            <label>Last Name : &nbsp;
              <input type='text' placeholder=' Enter Last Name' onChange={(e) => setlastName(e.target.value)} value={lastName} />
            </label>
          </div>
          <div className='ms-2'>
            <label>Age: &nbsp;
              <input type='number' placeholder=' Enter Age' onChange={(e) => setAge(e.target.value)} value={age || ""} />
            </label>
          </div>
          <div className='ms-2'>
            {
              !isUpdate ?
                <button className='btn btn-primary ' onClick={(e) => handleSave(e)} >Save</button>
                : <button className='btn btn-primary ' onClick={() => handleUpdate()}>Update</button>
            }
            <button className='btn btn-danger ms-2' onClick={() => handleClear()}>Clear</button>
          </div>
        </div >
        <div className='tbl-container'>
          <table className='table table-hover fs-5 fw-bolder'>
            <thead>
              <tr>
                <td>Id</td>
                <td>First Name</td>
                <th>Last Name</th>
                <td>Age</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {
                !data.length ?
                  <tr>
                    <td colSpan="5" className='opacity-75'>
                      <h1>No data found!</h1>
                    </td>
                  </tr>
                  :
                  data.map((item, index) => {
                    return (
                      <tr key={index}  >
                        <td className='text-secondary'>{index + 1}</td>
                        <td className='text-secondary'>{item.firstName}</td>
                        <td className='text-secondary'>{item.lastName}</td>
                        <td className='text-secondary'>{item.age}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                          <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
