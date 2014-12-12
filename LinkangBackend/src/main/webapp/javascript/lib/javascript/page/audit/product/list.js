/*
 * ------------------------------------------
 * 档期商品资料审核列表
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
],function(_u, preview,_html,AuditList,RejectWin,SimpleRejectWin,notify,config,_p,_o,_f,_r){
    return AuditList.extend({
        url:'/rest/audit/product/search',
        api:'/rest/audit/product/',
        rejectType:1,
        template:_html,
        data:{config:config},
        xdrOption:function(){
        	return {method:'POST'};
        },
        audit:function(_item,_passed){
            this._doAudit({poList:[_item.poId],list:[_item.id]},_passed);
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
                    _arr.push(_it.id);
                    _poarr.push(_it.poId);
                }
            );
            this._doAudit({poList:_poarr,list:_arr},_passed);
        },
        preview: function(_item){
        	preview.preview({id:_item.id,scheduleId:_item.poId})
            return false;
        },
        _doAudit:function(_data,_passed){
            var _name = !_passed?'reject':'pass',
                _url = this.api+_name,
                _data = _data;
            var _setStatusName = function(_ids,_name,_reason){
            	for(var i=0,l=_ids.length;i<l;i++){
            		for(var j=0,jl=this.data.list.length;j<jl;j++){
            			if(this.data.list[j].id==_ids[i]){
            				this.data.list[j].statusName = _name;
            				this.data.list[j].reason = _reason||'';
            			}
            		}
            	}
            }._$bind(this)
            if (!_passed){
            	var _win = new RejectWin();
                _win.$on('reject',function(_event){
                	var _rejectData ={ids:_data.list,poList:_data.poList};
                	if(this.rejectType==1){
                		_rejectData.reason = _event.reason;
                		_rejectData.descp = _event.descp;
                	} else{
                		_rejectData.reason = _event.reason;
                	}
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
});