/**
 * 活动列表筛选
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */

define([
  "text!./packetList.html",
  "pro/components/ListComponent",
  "pro/components/notify/notify",
  "pro/components/promotion/PacketEdit",
  "pro/extend/util"
  ], function(tpl, ListComponent, notify, PacketEdit, _){

 

  var PacketList = ListComponent.extend({
    url: "/packet/listData.json",
    //url: "/src/data/packet.json",
    name: "packet-list",
    api: "/packet/",
    template: tpl,
    config: function(data){
      _.extend(data, {
        total: 1,
        current: 1,
        limit: 10,
        list: [],
        auditState:data.audit == 0?-1:1,
        list: []
      });

      this.$watch(this.watchedAttr, function(){
        if(this.shouldUpdateList()) this.__getList();
      })
    },

    // @子类修改
    watchedAttr: ['current', 'auditState', 'down'],
    getExtraParam: function(data){
      return {state: data.auditState, apply:(data.audit == 0?1:0)}
    },
    remove: function(index){
      this.data.list.splice(index,1)
      this.$emit('updatelist');
    },
    addPacketList: function(_act){
      _act = _act || {};
      var editor = new PacketEdit({data: _act});
      editor.$on("confirm", function(){

      })
    },
    operate: function(_id,_opt,_auditValue){
      var _url = this.api + _opt,
          _data = {id:_id,auditValue:_auditValue};

      this._sendReq(_url,_data);
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

  var statusMap = {
    "0": "新建",
    "1": "审核中",
    "2": "审核通过",
    "3": "审核拒绝",
    "4": "已作废"
  };
  PacketList.filter("statusName", function(code){
    return statusMap[code]||"未知状态";
  });
  var ruleMap = {
    "RANDOM": "随机",
    "EQUALLY": "均分"
  };
  PacketList.filter("ruleName", function(rule){
    return ruleMap[rule]||"未知规则";
  });
  return PacketList;

})