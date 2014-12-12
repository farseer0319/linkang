/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./pdlist.html",
  "{pro}components/ListComponent.js"
  ], function(tpl, ListComponent){
  var PdList = ListComponent.extend({
    url: "/order/query/orderDetailList",
    name: "m-productlist",
    template: tpl,
    // @子类修改
    getExtraParam: function(data){
      return {
        type: window.__type__,
        key:window.__key__
      }
    },
    getPackLength: function(id){
      var length = 0,
          list = this.data.list.list;
      for(var i=0,len=list.length;i<len;i++){
        if(list[i].packageId == id){
          length++;
        }
      }
      return length;
    }
  });
  return PdList;

})