import { useEffect, useState } from "react";

export const EditTableComponent=(props)=> {
      
     const [editIndex, setEditIndex] = useState(-1);
     const [recData, setRecData] = useState();   
     const [tableData, setTableData] = useState(props.dataSource);
     

     const editRow = (id)=>{
        setEditIndex(id);
     }
     const cancelEdit = ()=>{
        setEditIndex(-1);
     }
     const saveRow=()=>{
        props.saveRecord(recData);
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
        
        console.log(JSON.stringify(tableData) + 'Length :' + tableData.length);
     };

     if(props.dataSource === undefined || props.dataSource.length === 0){
        return(
            <div className="alert alert-danger">
                 <strong>No Data to Show In Table Component</strong>    
            </div>
        );
     } else {

     // 1. Get Columns
    //const columns = Object.keys(props.dataSource[0]);
    
     // 2. The Table
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
