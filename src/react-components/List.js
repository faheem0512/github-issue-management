import React from "react";
import PropTypes from "prop-types";
import {arrayToJSON} from "../Utility"

class ReactList extends React.Component {
    constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);

    }
    componentDidMount(){
        /*event listener bind to get scroll position to fetch more data when end reached*/
        this.listContainerRef.addEventListener('scroll', this._handleScroll.bind(this));
    }
    _handleScroll(e){
        const {handleScroll} = this.props;
        handleScroll && handleScroll(e);
    }
    renderItem(dummyData, rowID) { /*done for grid support in list*/
        const {itemsPerRow,data,renderItem,gridStyle} = this.props;
        let sectionID = dummyData;
        let _childElms = [];
        if (data && data.length > 0) {
            let __gridRowStyle = {};
            for (var i = 0; i < itemsPerRow; i++) {
                let calcIndex = rowID * itemsPerRow + i;
                let __gridItemStyle = {};
                let __lastItemStyle = {};
                if (gridStyle && gridStyle.row) {
                    Object.assign(__gridRowStyle, gridStyle.row);
                    if (rowID != 0 && __gridRowStyle.margin) {
                        __gridRowStyle.marginLeft = __gridRowStyle.margin;
                        __gridRowStyle.marginRight = __gridRowStyle.margin;
                        __gridRowStyle.marginBottom = __gridRowStyle.margin;
                        delete __gridRowStyle.margin;
                    }
                }
                if (gridStyle && gridStyle.item) {
                    Object.assign(__gridItemStyle, gridStyle.item);
                    if (__gridItemStyle.margin) {
                        __lastItemStyle = {
                            marginRight: __gridItemStyle.margin,
                            marginBottom: __gridItemStyle.margin
                        };
                        if (gridStyle.row && gridStyle.row.margin) {
                            /* horizontal marigin balance is maintained by row now*/
                            __gridItemStyle.marginTop = __gridItemStyle.margin;
                        } else if (rowID == 0) {
                            /*if row margin is not available then item margin is balanced across the rows*/
                            __gridItemStyle.marginTop = __gridItemStyle.margin;
                        }
                        if (i == 0) {
                            __gridItemStyle.marginLeft = __gridItemStyle.margin;
                        }
                        __gridItemStyle.marginRight = __gridItemStyle.margin;
                        __gridItemStyle.marginBottom = __gridItemStyle.margin;
                        delete __gridItemStyle.margin;
                    }
                }

                if (data[calcIndex]) {
                        _childElms.push(<div key={"row__"+i+sectionID}
                                              style={arrayToJSON([{flex:1},__gridItemStyle])}>{renderItem(data[calcIndex])}</div>);
                } else {
                    _childElms.push(<div key={"row__"+i+sectionID} style={arrayToJSON([{flex:1},__lastItemStyle])}/>);
                }
            }
            return <div key={"group_"+rowID+sectionID}
                        style={arrayToJSON([{flexDirection:'row'},__gridRowStyle])}>{_childElms}</div>
        }
    }
    /*used for making dummy data for grid*/
    computeData() {
        var {data,itemsPerRow} = this.props;
        let computedData = [];
        if (data && data.length > 0) {
            let _noOfGroups = Math.ceil(data.length / itemsPerRow);
            if (_noOfGroups) {
                for (let i = 0; i < _noOfGroups; i++) {
                    computedData.push(i);
                }
            }
        }
        return computedData;
    }
    renderRow(row,index){
        const {itemsPerRow,renderRow,renderItem} = this.props;
        return itemsPerRow ? this.renderItem(row,index) : renderRow(row);
    }
    render(){
        const {renderHeader,renderFooter,itemsPerRow} = this.props;
        let {data} =  this.props;
        data = itemsPerRow ? this.computeData() : data;
        return <div className="flex-1">
            {renderHeader && renderHeader(data)}
            <div className="list-container" ref={_=>this.listContainerRef = _}>
                {data.map((row,index)=>{
                    return <div className="flex-1" key={`${index}__list_element`}>{this.renderRow(row,index)}</div>
                })}
            </div>
            {renderFooter && renderFooter(data)}
        </div>
    }
}

ReactList.defaultProps = {
    data:[]

}
ReactList.propTypes = {
    data:PropTypes.array,
    renderRow:PropTypes.func,
    renderHeader:PropTypes.func,
    renderFooter:PropTypes.func
}
module.exports = ReactList;
