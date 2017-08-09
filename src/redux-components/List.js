import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import uuid from "uuid";
import List from "../react-components/List";


import {fetchData} from "../redux-store/actions"

class ReduxList extends React.Component {

    static propTypes = {
        resultKeyword:PropTypes.string,
        url:PropTypes.string,
        fetchData:PropTypes.func,
        uniqueName:PropTypes.string,
        fireOn:PropTypes.number
    };

    static defaultProps = {
        data: []
    };

    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    componentWillMount(){
        if(this.props.url){
            this.fetchData();
        }
    }
    fetchData(options){
        const {uniqueName,fetchData,url,resultKeyword} = this.props;
        fetchData({name:uniqueName,url,resultKeyword,...options});
    }

    _handleScroll({event,previousContentOffsetY,loading,uniqueName,fireOn,next,resultKeyword,fetchData}){
        let eventTarget = event.target;
        let clientHeight = eventTarget.clientHeight;
        let scrollHeight = eventTarget.scrollHeight;
        let scrollTop = eventTarget.scrollTop;
        fireOn = fireOn || 100; /* when to fetch more data based on scroll position like when user has reached
         middle then fire on will 50 and next data call will be made when user crosses 50% of scroll position*/
        if(!previousContentOffsetY){
            previousContentOffsetY = scrollTop;
        } else {
            if(previousContentOffsetY > scrollTop){
                previousContentOffsetY = scrollTop;
                return previousContentOffsetY;
            }
            previousContentOffsetY = scrollTop;
        }
        if (((scrollHeight*(fireOn/100)) <= scrollTop) || (scrollTop >= scrollHeight-clientHeight)) {
            if (loading || (!next )) {
                return previousContentOffsetY;
            } else {

            }
            fetchData({url:next,append:true});
            return previousContentOffsetY;
        } else {
            return previousContentOffsetY;
        }

    }
    handleScroll(event){
        const {loading,fireOn,next,resultKeyword} = this.props;
        /*previousContentOffsetY is maintained to avoid fetching data when scrolled up*/
      this.previousContentOffsetY =  this._handleScroll({
          event,
          previousContentOffsetY:this.previousContentOffsetY,
          loading,
          fireOn:fireOn || 90, /* when scroll reaches to 90% next call will be fired*/
          next,
          fetchData:this.fetchData
        });
    }
    renderItem(row){
        const {renderItem,userProps} = this.props;
         return renderItem(row,{userProps,fetchData:this.fetchData})
    }

    render(){
        const {data,renderRow,renderItem,renderHeader,renderFooter,error,loading,userProps,...rest} = this.props;
        this.next = data ? data.next : null;
        return <div className="redux-list-container">
            {loading && <div>Loading....</div>}
            <List
                data={data}
                renderRow={renderRow}
                renderHeader={_=>renderHeader && renderHeader({data,userProps,fetchData:this.fetchData})}
                renderFooter={renderFooter}
                renderItem={renderItem && this.renderItem}
                handleScroll={this.handleScroll}
                {...rest}
            />
            {error && <div className="error`">{error}</div>}
        </div>
    }
}

ReduxList = connect((state,ownProps)=>{
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
},{
    fetchData
})(ReduxList);

export default class ReduxListWrapper extends React.Component{
    constructor(props){
        super(props);
        this.uniqueName = uuid.v4();

    }
    render(){
        return <ReduxList  {...this.props} uniqueName={this.uniqueName}/>
    }
}