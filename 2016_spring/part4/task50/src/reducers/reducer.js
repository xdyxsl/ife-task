// reducers
var todoReducer = function(state, action){
    
    if(typeof state === 'undefined'){
        return [];
    }
    
    switch(action.type){
        case 'add_todo':
            return state.slice(0).concat({
                text: action.text,
                completed: false
            });
            break;
        default:
            return state;
    }
};