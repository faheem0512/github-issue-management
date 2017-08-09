import React from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import uuid from "uuid"
import {fetchData} from "../redux-store/actions"
import CommentCard from "./CommentCard"
import List from "../redux-components/List"

class IssueDetail extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
    componentWillMount(){
        if(this.props.state){
            this.fetchData({url:this.props.state.url});
        }
    }
    fetchData(options){
        const {uniqueName,fetchData,url,resultKeyword} = this.props;
        fetchData({name:uniqueName,url,resultKeyword,...options});
    }
    render() {
        const {state,data,loading,error} = this.props;
        if (!state) {
            return <Redirect to={"/"}/>
        }
        return <div className="flex-1">
            {loading && <div>Loading....</div>}
            <Link to={{
                pathname:"/",
                state:void 0
            }} style={style.back}>Back To Home</Link>
            <div className="dont-shrink" style={style.heading}>Issue In {state.repoName}</div>
            {data ? <div>
                <div className="dont-shrink" style={style.title}>{data.title}</div>
                <div className="dont-shrink" style={style.body} dangerouslySetInnerHTML={{__html:data.body}} />
                {data.comments ? <List
                    url={data.comments_url}
                    renderRow={row=><CommentCard row={row}/>}
                    renderHeader={({data})=>{
                        return <div className="dont-shrink" style={{padding:"10px"}}>
                            Comments({data && data.length})
                        </div>
                    }}
                />:null}
            </div>:null}
            {error && <div className="error">{error}</div>}
        </div>
    }

}

IssueDetail = connect((state, ownProps) => {
    let mapStateToProps = {};
    let fetchDataState = state.fetchData[ownProps.uniqueName];
    if(fetchDataState){
        mapStateToProps.result = fetchDataState.result;
        mapStateToProps.data = fetchDataState.data;
        mapStateToProps.loading = fetchDataState.loading;
        mapStateToProps.error = fetchDataState.error;
        mapStateToProps.next = fetchDataState.next;
        mapStateToProps.userProps = fetchDataState.userProps;
    }
    return mapStateToProps;
}, {
    fetchData
})(IssueDetail);

export default class IssueDetailWrapper extends React.Component{
    componentWillMount(){
        this.uniqueName = uuid.v4();
    }
    render(){
        return <IssueDetail {...this.props} uniqueName={this.uniqueName} />
    }
}

const style = {
    back:{
        color: "#2d73d3",
        textDecoration: "underline",
        textAlign: "center",
        fontWeight:"bold",
        padding:"20px"
    },
    heading:{
        color:"#353c41",
        fontSize: "18px",
        fontWeight:"bold",
        textAlign:"center"
    },
    title: {
        color: "#2d73d3",
        fontSize: "16px",
        fontWeight:"bold",
        padding: "10px 20px",
        borderBottom:"1px solid #e1e1e1"
    },
    body: {
        padding: "10px 20px",
        fontSize: "15px",
        color: "#545f64",
        borderBottom:"1px solid #e1e1e1"
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