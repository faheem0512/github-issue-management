import React from "react";

module.exports = ({row={}})=>{
    return <div className="flex-1" style={{backgroundColor:"#f5f9fc",padding:"10px",
        borderBottom:"1px solid #e1e1e1"}}>
        <div className="row a-center">
            <img className="avatar" src={row.user.avatar_url} alt="NA"/>
            <div style={{marginLeft:"5px",color: "#545f66",
                fontWeight:"bold"}}>{row.user.login}</div>
        </div>
        <div className="row">
            <div className="avatar" />
            <div style={{marginLeft:"5px"}} dangerouslySetInnerHTML={{__html:row.body}} />
        </div>
    </div>
}