var bridge = require('lm-na-bridge')

function makeHybridRouterMethod(methodName) {
    return function(bridgeConnection, paramsObj, success, fail) {
    	try{
	        bridgeConnection.callHandler(methodName, paramsObj || {}, function(response) {
	            success && success()
	        })    		
    	}catch(err){
    		alert(err)
    		fail && fail(err)
    	}
    }
}

function executeHybridRouterMethod(options) {
    return new Promise((resolve, reject) => {
        bridge().then((bridgeConnection) => {
            router[options.name](bridgeConnection, options.query || {}, resolve, reject)
        }, reject)
    })
}

let router = {
    login: makeHybridRouterMethod('router_login'),
    back: makeHybridRouterMethod('router_back')
}



module.exports={
    push: executeHybridRouterMethod,
    back:function() {
        executeHybridRouterMethod({ name: 'back' })
    }
}
