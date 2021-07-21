class Queue{
    constructor(data,count){
        this.data = []
        this.count=0;
    }
    push(data_info){
        this.data.push(data_info);
        this.count++;
    }
    shift(){
        this.data.shift();
        this.count--;
        if (this.count < 0) this.count = 0 
    }
}
module.exports=Queue