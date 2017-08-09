import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

const CustomDate = ({value})=>{
    let today = new Date();
    let getdate = new Date(value);
    let  _format = "MMM DD YYYY";
    if (
        today.getDate() === getdate.getDate() &&
        today.getMonth() === getdate.getMonth() &&
        today.getYear() === getdate.getYear()
    ) {
        _format = "h:mm";
    } else if (today.getMonth() === getdate.getMonth() && today.getYear() === getdate.getYear()) {
        _format = "MMM DD";
    } else if (today.getYear() === getdate.getYear()) {
        _format = "MMM DD";
    }
    return <div style={style.date}>{moment(value).format(_format)}</div>
};

const Avatar = ({src})=>{
    return <img className="avatar" src={src} alt="" />
};


module.exports = ({row={},userProps={}})=>{
    return <div className="flex-1 grid-card">
        <Link to={{
            pathname:"/issueDetail",
            state:{url:row.url,comments_url:row.comments_url,repoName:userProps.repoName}
        }}>
            <div className="flex-1" style={style.title}>{row.title}</div>
            <div className="flex-1 row" style={style.issueNumber}>
                Issue Number: <div style={style.issueNumberValue}> {row.number}</div>
            </div>
            <div className="flex-1 row a-center">
                <Avatar src={row.user.avatar_url}/>
                <div style={{marginLeft:"5px"}}>
                    <div style={style.user}>{row.user.login}</div>
                    <CustomDate value={row.updated_at}/>
                </div>
            </div>
        </Link>
    </div>
};


const style = {
    title: {
        color: "#2d73d3",
        fontSize: "16px",
        fontWeight: "bold"
    },
    issueNumber: {
        padding: "10px 0",
        fontSize: "14px",
        color: "#9fa3a6"
    },
    issueNumberValue: {
        fontSize: "15px",
        color: "#8c9296",
        fontWeight: "bold"
    },
    user: {
        color: "#89949d",
        fontSize: "15px",
    },
    date: {
        marginTop: "5px",
        color: "#d0d5d8",
        fontSize:"13px"
    }
};