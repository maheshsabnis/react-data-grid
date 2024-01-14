import { useEffect, useState } from "react";

export const EditTableComponent=(props)=> {
      // The edit index to -1
     const [editIndex, setEditIndex] = useState(-1);
     // The record that will be bound with the Table row
    //  const [recData, setRecData] = useState(props.dataSource[0]);
    const [recData, setRecData] = useState(Object.create(props.dataSource[0])); 
    // The State Object for the Edit
     const [editRecData, setEditRecData] = useState({}); 
     // Data to be displayed in the HTML Table   
     const [tableData, setTableData] = useState(props.dataSource);
     const [operationType, setOperationType] = useState('');

    
     
     const editRow = (id)=>{       
        setEditIndex(id);
        // alert(`EditIndex in Edit Row Button ${id} and Edit Index ${editIndex}`);
        // Read Old Valeus for the Edit Clicked Rows
        let rec = props.dataSource.filter((r,i)=>{
            // alert(`In Loop ${JSON.stringify(Object.values(r)[0])} and id=${id}`);
            return Object.values(r)[0] === id;
        })[0];
        setEditRecData(rec);
        // Set the OPerationType as 'Edit'
        setOperationType('Edit');
     }
     const cancelEdit = ()=>{
        setEditIndex(-1);
     }
     const saveRow=()=>{
      // alert(`The data : ${JSON.stringify(recData)}`);
       // if(operationType === 'New'){
        if(editRecData === undefined){
            alert('Save New');
            props.saveRecord(recData,'Save');
        } else {
        //if(operationType === 'Edit'){
            alert('Save Edit');
            // alert(`EditIndex in Save ${editIndex}`);
            // alert(`In TableComponent for Edit ${JSON.stringify(editRecData)}`);
            props.saveRecord(editRecData,'Edit');
        }
        setEditIndex(-1);
        setOperationType('');
     };
     const deleteRow = (rec)=>{
        props.delete(rec);  
     }
     const handleChanges =(evt)=>{
        if(editRecData === undefined) {
           // alert(`New`);
            setRecData({...recData, [evt.target.id]:evt.target.value});    
        } else {
          //  alert(`Edit`);
            setEditRecData({...editRecData, [evt.target.id]:evt.target.value});
        }
        // if(operationType === 'New'){
        //    alert(`Handle Cahnges New`);
        //     setRecData({...recData, [evt.target.id]:evt.target.value});
        // } 
        // if(operationType === 'Edit'){
        //    alert(`Handle Cahnges Edit`);
        //     setEditRecData({...editRecData, [evt.target.id]:evt.target.value});
        // }
     };
     const addNewRecord=()=>{
        //tableData.push({});
        setTableData([...tableData, {}]);
        setOperationType('New');
     };

     if(props.dataSource === undefined || props.dataSource.length === 0){
        return(
            <div className="alert alert-danger">
                 <strong>No Data to Show In Table Component</strong>    
            </div>
        );
     } else {
     return (
        <div className="container">
            <div className="container" hidden={!props.canAdd}>
                <button className="btn btn-primary"
                onClick={addNewRecord}
                >Add New Record</button>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {
                            props.columns.map((column,index)=>(
                                <th key={index}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((record,idx)=>(
                            Object.values(record)[0] === editIndex ? 
                            <tr key={idx}>
                               {
                                props.columns.map((column,index)=>(
                                    <td key={index}>
                                        <input value={record.column}
                                            placeholder={record[column]}
                                            id={column}  
                                            onChange={handleChanges}
                                        />
                                    </td>
                                ))
                              }   
                               <td>
                                    <button className="btn btn-success"
                                     onClick={saveRow}
                                    >Save</button>
                                </td> 
                                <td>
                                    <button className="btn btn-primary"
                                    onClick={cancelEdit}
                                    >Cancel</button>
                                </td>   
                            </tr>
                            :
                            <tr key={idx}>
                            {
                                props.columns.map((column,index)=>(
                                    <td key={index}>{record[column]}</td>
                                ))
                               
                            } 
                             <td hidden={!props.canEdit}>
                                    <button className="btn btn-warning"
                                    onClick={()=>editRow(Object.values(record)[0])}>Edit</button>
                                </td>
                                <td hidden={!props.canDelete}>
                                    <button className="btn btn-danger"
                                    onClick={()=>deleteRow(Object.values(record)[0])}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }        
                </tbody>
            </table>
        </div>
     );
    }
}
