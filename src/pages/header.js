import React, { Component } from 'react';
import Modal from 'react-modal';
import MemberStores from '../stores/memberStores';


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            openAddMemberModal:false,
            name:'',
            company:'',
            note:'',
            status:''
        };
        
    }
    closeAddMemberModal(){
        this.setState({
            openAddMemberModal:false
        })
    }
    _addMember(){
        let {name,company,note,status}= this.state;
        this.setState({
            openAddMemberModal:false
        },()=>{
            MemberStores.addMember({name,company,note,status});
        })
        
    }
    render() {
        return (
            <div className="main-cnt">
                <div className="header-cnt">
                    <div className="main-header"> Team Member </div>
                    <div> 
                      <button className="add-btn" type="button" onClick={()=>{this.setState({openAddMemberModal:true})}}>Add Member</button>
                    </div>
                </div>
                <Modal
                    className="member-modal"
                    isOpen={this.state.openAddMemberModal}
                    onRequestClose={this.closeAddMemberModal.bind(this)}
                    contentLabel="Modal"
                >
                    <div className="label-div">

                       <div> <label className="text-label"> Name </label> </div>
                       <div> 
                            <input className="text-inp" 
                                type="text" 
                                onChange={(event)=>{this.setState({name:event.target.value})}}/>
                        </div>
                    </div>
                    <div className="label-div">
                        <div><label className="text-label"> Company </label> </div>
                        <div> <input className="text-inp" 
                            type="text" 
                            onChange={(event)=>{this.setState({company:event.target.value})}}/></div>
                    </div>
                    <div className="label-div">
                        <div className="text-label"> <label>Status</label></div>
                        <div> <select className="text-inp" 
                                onChange={(event,value)=>{this.setState({status:event.target.value})}}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select></div>
                    </div>
                    <div className="label-div">   
                        <div className="text-label"> <label> Note </label> </div>
                        <div> <input type="text" className="text-area" onChange={(event)=>{this.setState({note:event.target.value})}}/></div>
                    </div>
                    <button className="add-btn modal-btn" type="button" onClick={this._addMember.bind(this)}>Add Member</button>
                </Modal>
            </div>
        );
    }
}

 
