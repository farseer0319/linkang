/*
 * ------------------------------------------
 * 档期商品审核列表
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
		'base/util',
		'pro/widget/util/preview',
	    'text!./list.html',
	    '../widget/list.js',
	    '../widget/reject/reject.js',
	    '../widget/reject/reject.simple.js',
	    'pro/components/notify/notify',
	    'pro/extend/config'
	    ],function(_u, preview, _html,AuditList,RejectWin,SimpleRejectWin,notify,config,_p,_o,_f,_r){
    var List =  AuditList.extend({
		        url:'/rest/audit/material/search',
		        api:'/rest/audit/material/',
		        template:_html,
		        data:{config:config},
		        config:function(data){
		        	this.supr(data);
		        	data.key= 'skuId';
		        },
		        xdrOption:function(){
		        	return {method:'POST'}
		        },
		        audit:function(_item,_passed){
		        	this._doAudit({poList:[_item.poId],list:[_item.skuId]},_passed);
		        },
		        batchAudit:function(_passed){
		            var _list = this._getList('checked')||_r;
		            if (!_list||!_list.length){
		                notify.showError('请先选择要操作的项');
		                return;
		            }
		            var _arr = [],_poarr=[];
		            _u._$forEach(
		                _list,function(_it){
		                    _arr.push(_it.skuId);
		                    _poarr.push(_it.poId);
		                }
		            );
		            this._doAudit({poList:_poarr,list:_arr},_passed);
		        },
		        // 预览 copy自backend
			    preview: function(_item){
			    	preview.preview({id:_item.id,scheduleId:_item.poId})
			      return false;
			    },
		        _doAudit:function(_ids,_passed){
		            var _name = !_passed?'reject':'pass',
		                _url = this.api+_name,
		                _data = _ids;
		            var _setStatusName = function(_ids,_name,_reason){
		            	for(var i=0,l=_ids.length;i<l;i++){
		            		for(var j=0,jl=this.data.list.length;j<jl;j++){
		            			if(this.data.list[j].skuId==_ids[i]){
		            				this.data.list[j].statusName = _name;
		            				this.data.list[j].reason = _reason||'';
		            			}
		            		}
		            	}
		            }._$bind(this)
		            if (!_passed){
	            		var _win = new SimpleRejectWin();
		                _win.$on('reject',function(_event){
		                	var _rejectData ={ids:_data.list,poList:_data.poList};
		                	
		                		_rejectData.reason = _event.reason;
		                	
		                    //this._sendReq(_url,_rejectData);
		                	this.$request(_url,{
		                        method:'POST',
		                        data:_rejectData,
		                        onload:function(_json){
		                            notify.show('审核操作成功');
		                            _setStatusName(_data.list,'审核不通过',_rejectData.reason);
		                            this.$update('allChecked',false);
		                            //this.$emit('updatelist');
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
	                        data:_data,
	                        onload:function(_json){
	                            notify.show('审核操作成功');
	                            _setStatusName(_data.list,'审核通过');
	                            this.$update('allChecked',false);
	                            //this.$emit('updatelist');
	                        },
	                        onerror:function(_error){
	                            notify.showError('审核操作失败');
	                        }
	                    });
		            }
		        }
		    });
    List.filter("skuId", function(code){
        return statusMap[code]||"未知状态";
      })
    
    return List;
});