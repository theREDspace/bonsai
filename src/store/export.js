export const exportState = state => {
    try {
        return gameJSON(state);
    } catch (err) {
      return null
    }
  }
  
  export function gameJSON(state) {
    let stateJSON = {};
    console.log(state)
    for (let nodeId in state.nodes) {
        let node = state.nodes[nodeId] 
        stateJSON[node.id] = 
        {
          "id" : node.id,
          "title" : node.title,
          "type": node.type,
          "name" : node.body,
          "intentName" : node.nextIntent
        }

        if(node.maxRetries > 0)
        {
          stateJSON[node.id]["retryValue"] = node.maxRetries
          stateJSON[node.id]["retryMessage"] = node.errorMessage
        }

        let linkArr = [];
        for(let i=0;i < state.links.length;i++)
        {
          if(state.links[i][0] === node.id)
          {
            linkArr.push(state.links[i][1])
          }
        } 
        
        stateJSON[node.id]["next"] = linkArr
    }

    return JSON.stringify(stateJSON);
  }