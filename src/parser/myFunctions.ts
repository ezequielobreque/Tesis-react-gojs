


const createNodeGo=(x:any)=>{

}

const entityAction=(entities:any)=>{
    /*entities.map(x =>{
        createNodeGo(x)
    })*/
}


export const ActionsFunctions=(x:any)=>{
    
    if(x){
        const data=x
        
        const Entity=data.Entitiy||[]
        const Relationship=data.Relationship||[]
        const Composite=data.Composite||[]
        
        entityAction(Entity);
    
    
    
    }
}
