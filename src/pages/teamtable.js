import React, { Component } from 'react';
import MemberStores from '../stores/memberStores';


export default class TeamTable extends Component {
    constructor(props){
        super(props);
        this.state={
            members: MemberStores.getAllMember() || [],
        }
        this._getMemberChanges = this._getMemberChanges.bind(this);
    }
    componentWillMount(){
        MemberStores.on('change',this._getMemberChanges);
    }
    componentWillUnmount(){
        MemberStores.removeListener('change',this._getMemberChanges);
    }
    _getMemberChanges(type){
        if(type==='NEW_MEMBER'){
            this.setState({
                members: MemberStores.getAllMember() || []
            })
        }
    }
    displayMembers(){
        let {members} = this.state;
        if(members.length){
            return members.map((m,i)=>{
                return (
                         <Rows key={`Member-${i}`} details={m} keyIndex={m.keyIndex}/>
                   
                )
            })
        }
        return null;
    }
    selectAllTeamMember(){
        MemberStores.selectAllTeamMember();
    }
    sortList(type){
        MemberStores.sortMember(type);
    }
    render() {
        return (
            <div>
                <ul>
                    <li className="tbl-li">

                        {/*<div onClick={this.selectAllTeamMember.bind(this)}
                            >
                            Check All
                        </div>*/}
                        <div className="tbl-el" onClick={this.sortList.bind(this,'name')}>Name
                        </div>
                        <div className="tbl-el" onClick={this.sortList.bind(this,'company')}>Company
                        </div>
                        <div className="tbl-el" onClick={this.sortList.bind(this,'status')}>Status
                        </div>
                        <div className="tbl-el" >Notes</div>
                        <div className="tbl-el">Action</div>
                    </li>
                    {this.displayMembers()}
                </ul>
                
            </div>
        );
    }
}

class Rows extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            selectedMembers:MemberStores.getStatusMember[props.keyIndex],
        }
        this._getMemberChanges = this._getMemberChanges.bind(this);
    }
    componentWillMount(){
        MemberStores.on('change',this._getMemberChanges);
    }
    componentWillUnmount(){
        MemberStores.removeListener('change',this._getMemberChanges);
    }
   
    _getMemberChanges(type){
        if(type=='MEMBER_SELECT'){

        }
    }
    deleteEntry(){
        MemberStores.deleteEntry(this.props.keyIndex);
    }
    selectTeamMember(){
        MemberStores.selectTeamMember(this.props.keyIndex);
    }
    render(){
        let {details,keyIndex}= this.props;
        let {selectedMembers} = this.state;
        return(
            <li className="tbl-li">
               {/* <div>
                    <input type="checkbox" checked={selectedMembers} onChange={this.selectTeamMember.bind(this)}/>
                </div>*/}
                <div className="tbl-el">{details.name}</div>
                <div className="tbl-el">{details.company}</div>
                <div className="tbl-el">{details.status}</div>
                <div className="tbl-el">{details.note}</div>
                <div className="tbl-el"
                        onClick={this.deleteEntry.bind(this)}
                >Delete</div>
            </li>
        )
    }
} 
 
