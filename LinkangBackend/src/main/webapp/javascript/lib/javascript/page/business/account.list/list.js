/*
 * ------------------------------------------
 * 档期商品资料审核列表
 * @version  1.0
 * @author   yuqijun(yuqijun@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/util',
    'text!./list.html',
    'pro/components/ListComponent',
    'pro/components/notify/notify'
],function(_ut,_html,ListComponent,notify,_p,_o,_f,_r){
    return ListComponent.extend({
        url:'/business/account/list',
        template:_html,
        format:function(timestamp){
        	var date = new Date(timestamp);
        	return _ut._$format(date,'yyyy-MM-dd');
        },
        getExtraParam:function(){
            return this.data.condition;
        },
        lock:function(item){
            this.$request('/business/lock/'+item.id,{
            	onload:function(json){
            		if(json.code==200){
            			item.isActive = 1;
            		} else{
            			if(json.result){
            				notify.show(json.result.msg);
            			} else{
            				notify.show('冻结失败');
            			}
            		}
            	}
            })
        },
        unlock:function(item){
        	this.$request('/business/unlock/'+item.id,{
            	onload:function(json){
            		if(json.code==200){
            			item.isActive = 0;
            		} else{
            			notify.show('激活失败');
            		}
            	}
            })
        },
        refresh:function(_data){
            if (!!_data.url){
                this.url = _data.url;
                delete _data.url;
            } 
        	this.data.current = 1;
            this.data.condition = _data;
            this.$emit('updatelist');
        },
    });
});