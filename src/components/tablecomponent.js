import { useEffect, useState } from "react";

export const EditTableComponent=(props)=> {
      // The edit index to -1
     const [editIndex, setEditIndex] = useState(-1);
     // The record that will be bound with the Table row
     const [recData, setRecData] = useState(props.dataSource[0]); 
     // Data to be displayed in the HTML Table   
     const [tableData, setTableData] = useState(props.dataSource);
     const [operationType, setOperationType] = useState('');
     
     const editRow = (id)=>{
        if(operationType !== 'New')
            setOperationType('Edit'); 
        setEditIndex(id);
     }
     const cancelEdit = ()=>{
        setEditIndex(-1);
     }
     const saveRow=()=>{
       alert(`The data : ${JSON.stringify(recData)}`);
        props.saveRecord(recData);
        setOperationType('');
        setEditIndex(-1);
     };
     const deleteRow = (rec)=>{
        props.delete(rec);  
     }
     const handleChanges =(evt)=>{
        setRecData({...recData, [evt.target.id]:evt.target.value});
     };
     const addNewRecord=()=>{
        //tableData.push({});
        setTableData([...tableData, {}]);
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
