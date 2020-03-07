class Task {

    static taskList = [];
    static isBusy = false;
    constructor(message){
        this.id = Date.now();
        this.desc = message;
        Task.taskList.push({_id: this.id, description: this.desc});
        this.scheduler();
    }

    scheduler(){
        if(Task.taskList.length > 0 && !Task.isBusy){
            let id = Task.taskList[0]._id;
            Task.isBusy=true;
            this.job(id).then(val=>{
                this.updateValues(id);
            }).catch(err=>{
                this.updateValues(id);
            })
        }
    }

    job(id){
        return new Promise((resolve,reject)=>{
            this.updateCurrent("Current Task : ".concat(id));
            setTimeout(()=>{
                if(Math.random()<0.90) // Simulating a system with 90% accuracy
                    resolve(`Job- ${id} : Done`);
                else
                    reject(`Job- ${id} : Failed To Execute`);
            },3000);
        })
    }

    updateValues(id){
        Task.taskList.forEach((item,index)=>{
            if(item._id === id){
                Task.taskList.splice(index,1);
                return;
            }
        })
        Task.isBusy=false;
    }
}