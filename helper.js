var HashMap = require('hashmap');

var ws_info = function(ws) {
  this.mode_ = "world_server";
  this.ip_ = "";
  this.port_ = -1;
};

var ws_helper = function() {

  this.add = function(ws) {
    this.ws_container_.set(ws, new ws_info);
    console.log('added: ' + this.ws_container_.count());
  };

  this.remove = function(ws) {
    this.ws_container_.remove(ws);
    console.log('removed: ' + this.ws_container_.count());
  };

  this.send = function(ws, payload) {
    ws.send(JSON.stringify(payload));
  };

  this.handle = function(ws, msg) {
    var r = this.ws_container_.has(ws);
    if(r) {
      console.log('yes');
    } else {
      console.log('no');      
    }

    this.process(ws, msg);
    
    console.log('complete processing');
  };

  this.process = function(ws, msg) {
    try {
      var payload = JSON.parse(msg);

      console.log('recv: ' + payload);
      
      var type = payload['type'];
      
      if (type == 'cs_set_mode') {
	var mode = payload['mode'];
	var ws_info = this.ws_container_.get(ws);
	
	if(!ws_info) {
	  console.log('not found ws');
	  return;
	}
	
	ws_info.mode = mode;
	this.send(ws, {'type': 'res_set_mode', 'result': true});

	/*
	this.send(ws, {'type': 'cs_system_status', 'cpu_usage': '1',
		       'memory_usage': '2', 'total_memory_size': '3',
		       'session_count': '4'});
	 */

      } else if (type == 'cs_system_status') {
	this.broadcast_user(JSON.stringify(payload));
      }
    } catch(e) {
      console.log('fail to parse json');
      console.log(e);
    }
  };

  this.broadcast_user = function(msg) {
    var find_count = 0;
    this.ws_container_.forEach(function(value, key) {
      if(value.mode == 'user') {
	key.send(msg);
	find_count++;
      }
    });

    console.log('user count: ' + find_count);
  };

  /*
  this.broadcast_all = function(msg) {
    for(var _ws in this.ws_container) {
      _ws.send('aa');
    }
  };
  */
		     
  this.ws_container_ = new HashMap;
};

exports.ws_helper = new ws_helper;

/*
exports.client_type = {"server" : 0, "user" : 1};  
  
exports.ws_helper = function(_ws, _id, _type) {
    this.ws_ = _ws;
    this.id_ = _id;
    this.type = _type;

    this.send = function(id, msg) {
      this.ws_.send(msg);
    };

  
};

global.uid = 0;
*/
