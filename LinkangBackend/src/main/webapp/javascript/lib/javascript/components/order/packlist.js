/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./packlist.html",
  "{pro}components/ListComponent.js"
  ], function(tpl, ListComponent){
  var PdList = ListComponent.extend({
    url: "/order/query/packlist",
    name: "m-packlist",
    template: tpl,
    data: {
      statusMap:{
        1: "待发货",
        2: "配送中",
        3: "已签收",
        4: "拒签"
      }
    },
    // @子类修改
    getExtraParam: function(data){
      return {
        type: window.__type__,
        key:  window.__key__
      }
    }
  });
  return PdList;

})