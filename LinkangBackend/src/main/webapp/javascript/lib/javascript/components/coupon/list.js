/**
 * 活动列表筛选
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */

define([
  "text!./list.html",
  "{pro}components/ListComponent.js",
  'pro/components/notify/notify',
  "{pro}extend/util.js"
  ], function(tpl, ListComponent,notify,_){
  var CouponList = ListComponent.extend({
    url: "/coupon/listData.json",
    name: "m-couponlist",
    api:"/coupon/",
    config: function(data){
        _.extend(data, {
          total: 1,
          current: 1,
          limit: 10,
          list: [],
          auditState:data.audit == 0?-1:1
        });

        this.$watch(this.watchedAttr, function(){
          if(this.shouldUpdateList()) this.__getList();
        })
      },
    template: tpl,

    // @子类修改
    watchedAttr: ['current', 'auditState'],
    getExtraParam: function(data){
      return {state: data.auditState,apply:(data.audit == 0?1:0)};
    },
    onChange: function(e){
    	var _node = e.target;
    	this.data.current = 1;
    	this.data.auditState = _node.value;
    },
	_sendReq:function(_url,_data){
      this.$request(_url,{
          method:'post',
          query:_data,
          onload:function(_json){
        	  notify.notify({
                  type: "success",
                  message: _json.message
                });
              this.$emit('updatelist');
          },
          onerror:function(_error){
        	  notify.notify({
                  type: "error",
                  message: _error.message
                });
          }
      });
	},
	operate: function(_id,_opt,_auditValue){
	  var _url = this.api + _opt,
	      _data = {id:_id,auditValue:_auditValue};
	  	  	
      this._sendReq(_url,_data);
    },
	__getList: function(){
      var data = this.data;
      this.$request(this.url, {
        progress: true,
        data: this.getListParam(),
        onload: function(json){
          data.total = json.total;
          data.list = json.list;
        },
        onerror: function(json){
        	notify.notify({
                type: "error",
                message: "网络异常，稍后再试！"
              });
        }
      })
    }
  });
  return CouponList;

})