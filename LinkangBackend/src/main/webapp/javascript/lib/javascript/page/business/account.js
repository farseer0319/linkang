/**
 * 账号页
 * author yuqijun(yuqijun@corp.netease.com)
 */

define(['{lib}base/util.js',
    '{lib}base/event.js',
    '{lib}base/element.js',
    './account.list/list.js',
    '{pro}widget/module.js',
    '{pro}/widget/util/search.select.js'
    ],
    function(ut,v,e,List,Module,searchForm,p) {
        var pro;

        p._$$AccountModule = NEJ.C();
        pro = p._$$AccountModule._$extend(Module);
        
        pro.__init = function(_options) {
            this.__supInit(_options);
			
            var _form = searchForm._$allocate({
		        form:'search-form',
		        onsearch:function(_data){
		        	if(!this.__list){
		        		this.__list = new List({data:{condition:_data}});
		        		this.__list.$inject('#accountlist');
		        	} else{
		        		this.__list.refresh(_data);
		        	}
		        }._$bind(this)
		    });
        };
        
        
        p._$$AccountModule._$allocate();
    });