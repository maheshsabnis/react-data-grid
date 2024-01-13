import { Employees } from './models/data';
import { EditTableComponent } from './components/tablecomponent';
import { CategoryService } from './catservice';
import { useEffect, useState } from 'react';
function App() {
  
  const [categories, setCategories] = useState([]);
  const [columns, setColumns] = useState([]);
  const [category, setCategory] = useState({
    CategoryId: 0,
    CategoryName: '',
    BasePrice: 0,
  });
  const serv= new CategoryService();

  useEffect(()=>{
     serv.getCategories().then(resp=>{
       setCategories(resp.data);
       setColumns(Object.keys(resp.data[0]));
     }).catch(error=>{
      console.log(`Error : ${error}`);
     })
  } ,[]);

  const save=(rec)=>{
     serv.postCategory(rec)
         .then(response=>{
           return response.data;
         }).then(data=>{
            setCategories(data);
            window.location.reload(true);
         })
         .catch(error=>{
           console.log(`Error occurred while saving record: ${error}`);
         }); 
  };
  const deleteRecord=(rec)=>{
    
  };
  if(categories === undefined || categories.length === 0){
    return (
      <div className='alert alert-danger'>
        <strong>No data to show in Main</strong>
      </div>
    );
  } else {
  return (
    <div className="container">
       <h1>React Editable Grid</h1>
       <EditTableComponent dataSource={categories} saveRecord={save}
         delete={deleteRecord} canDelete={true} canEdit={true}
         columns = {columns}
          canAdd={true}
         />
    </div>
  );
}
}

export default App;
