import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
class MemberStores extends EventEmitter{
	constructor(){
		super();
		this.members=[];
		this.selectedMembers={};
	}
	addMember(data){
		
		let member = {};
		data['keyIndex']='Member-'+this.members.length;
		this.members.push(data);
		this.selectedMembers[`Member-${this.members.length}`]=false;
		this.emit('change','NEW_MEMBER');
	}
	
	getAllMember(){
		return this.members;
	}
	selectTeamMember(keyIndex){
		this.selectedMembers[keyIndex]=!this.selectedMembers[keyIndex];
	}
	selectAllTeamMember(){
		for(let i in this.selectedMembers){
			this.selectedMembers[i]=!this.selectedMembers[i];
		}
		this.emit('change','MEMBER_SELECT');
	}
	getStatusMember(keyIndex){
		return this.selectedMembers[keyIndex];
	}
	deleteEntry(keyIndex){
		let index = '';
		this.members.map((m,i)=>{
                if(keyIndex==m.keyIndex){
                	index =  i;
                }
            });
		this.members.splice(index,1);
		this.emit('change','NEW_MEMBER');
	}
	sortMember(type){
		let mem = [];
		this.members.sort(function(a,b) {
				if (a[type] < b[type])
			    	return -1;
			  	if (a[type] > b[type])
			    	return 1;
			  	return 0;
			});
		this.emit('change','NEW_MEMBER');
	}
	_handleActions(action){
		
	}
}

const memberStores = new MemberStores;
dispatcher.register(memberStores._handleActions.bind(memberStores));
export default memberStores;
