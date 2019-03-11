export const exportState = state => {
    try {
        var gjson = gameJSON(state);
        console.log(gjson);
        return gjson;
    } catch (err) {
      return null
    }
  }
  
  export function gameJSON(state) {
    var stateJSON = {};

    for (var nodeId in state.nodes) {
        var node = state.nodes[nodeId] 
        stateJSON[node.title] = 
        {
          "id" : node.id,
          "type": node.type,
          "name" : node.body,
          "intentName" : node.nextIntent
        }

        if(node.maxRetries > 0){
          stateJSON[node.title]["retryValue"] = node.maxRetries,
          stateJSON[node.title]["retryMessage"] = node.errorMessage
        }

        for(var i=0;i < state.links.length;i++){
          if(state.links[i][0] == node.id){
            stateJSON[node.title]["next"] = state.links[i][1]
          }
        }    
    }

    return JSON.stringify(stateJSON);
  }