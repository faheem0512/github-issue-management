import React from "react";

export default class SearchBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    _onKeyPress(e){
        let {fetchData} = this.props;
        if(e.key === "Enter"){
            let _value = e.target.value;
            let _lsIndx = _value.lastIndexOf("/");
            let repoName = _value.substring( _lsIndx+1);
            _value = _value.substring(0,_lsIndx);
            _lsIndx = _value.lastIndexOf("/");
            let ownerName = _value.substring( _lsIndx+1);
            if(!ownerName || !repoName){
                alert("please enter a valid repo URL");
                return;
            }
            let url = `https://api.github.com/repos/${ownerName}/${repoName}/issues`
            fetchData && fetchData({url,userProps:{repoName}});
        }
    }

    render(){
        const {userProps={}} = this.props;
        return <div className="search-box" style={{padding:"10px"}}>
            <input type="text"
                   autoFocus
                   onKeyPress={this._onKeyPress}
                   name="searchbox"
                   placeholder="Paste URL for Git Repo and press enter"
            />
            {userProps.repoName && <div style={{
                textAlign:"center",
                padding:"10px"
            }}>
                Issues of {userProps.repoName}
            </div>}
        </div>
    }
}

