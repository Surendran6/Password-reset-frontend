const loginReducer =(state,action)=>{
    switch(action.type){
        case 'AUTHIEN':
            return ! state;
        default:
            return state;
    }
}

export default loginReducer