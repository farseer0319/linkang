/*
 * ------------------------------------------
 * 档期列表页面
 * @version  1.0
 * @author   yuqijun(yuqijun@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
	'base/event',
    '{pro}/widget/form.js',
    '{pro}components/schedule/poreturnTable.js',
    '{pro}widget/module.js',
    '{pro}extend/request.js',
    '{pro}components/notify/notify.js'
],function(v,ut,List,Module,request,notify,_p,_o,_f,_r){
	var pro;
	_p._$$ListModule = NEJ.C();
	pro = _p._$$ListModule._$extend(Module);
	
	pro.__init = function(_options) {
		this.__supInit(_options);
		
		
	    
	 // init search form
	    var _form = ut._$$WebForm._$allocate({
	        form:'search-form',
	        onsubmit:function(_data){
	        	if(!this.__list){
	        		this.__list = new List({data:{condition:_data}});
	        		this.__list.$inject('#module-box');
	        	} else{
	        		this.__list.refresh(_data);
	        	}
	        }._$bind(this)
	    });
	    
	    v._$addEvent('returnnote','click',function(){
	    	request('/oms/returnOrder/create',{
	    		method:'POST',
	    		type:'json',
	    		data:_form._$data(),
	    		onload:function(json){
	    		if(json&&json.code==200){
	    			location.href= '/schedule/returnnote';
	    		}
	    	},onerror:_f})
	    })
    };
    
    _p._$$ListModule._$allocate();
});
