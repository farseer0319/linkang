/*
 * ------------------------------------------
 * 档期商品资料审核列表
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'text!./list.html',
    '../widget/list.js',
    'pro/extend/config',
    '../widget/reject/reject.simple.js',
    'pro/components/notify/notify'
],function(_html,AuditList,config,SimpleRejectWin,notify,_p,_o,_f,_r){
	var List =AuditList.extend({
	        url:'/schedule/pages/search',
	        api:'/schedule/pages/',
	        data:{config:config},
	        template:_html,
	        xdrOption:function(){
	        	return {method:'POST'};
	        },
	        _doAudit:function(_item,_passed){
	            var _name = !_passed?'reject':'pass',
	                _url = this.api+_name;
	            
	            if (!_passed){
            		var _win = new SimpleRejectWin();
	                _win.$on('reject',function(_event){
	                	var _rejectData ={ids:[_item[0].id],scheduleId:_item[0].scheduleId};
	                	_rejectData.reason = _event.reason;
	                    //this._sendReq(_url,_rejectData);
	                	this.$request(_url,{
	                        method:'POST',
	                        data:_rejectData,
	                        onload:function(_json){
	                            notify.show('审核操作成功');
	                            _item[0].status = 4;
	                            _item[0].statusMsg = _event.reason;
	                            this.$update();
	                        },
	                        onerror:function(_error){
	                            notify.showError('审核操作失败');
	                        }
	                    });
	                    _win.close();
	                }._$bind(this));
	            }else{
	                //this._sendReq(_url,_data);
	            	this.$request(_url,{
                        method:'POST',
                        data:[_item[0].id],
                        onload:function(_json){
                            notify.show('审核操作成功');
                            _item[0].status = 3;
                            //_item[0].statusMsg = '审核通过';
                            this.$update();
                        },
                        onerror:function(_error){
                            notify.showError('审核操作失败');
                        }
                    });
	            }
	        }
	    });
	
		List.filter('statusMap',function(_status){
			 var _smap = ['','未提交','待审核','审核通过','审核拒绝'];
			return _smap[_status];
		})
	return List
});