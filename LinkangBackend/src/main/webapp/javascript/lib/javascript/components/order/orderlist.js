/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./orderlist.html",
  "{pro}components/ListComponent.js"
  ], function(tpl, ListComponent){
  var OrderList = ListComponent.extend({
    url: "/order/query/getOrderList",
    name: "m-orderlist",
    template: tpl,
    data:{
      statusMap:{
        '0':'等待付款',
        '1':'待发货',
        '2':'待发货',
        '5':'待发货',
        '6':'待发货',
        '9':'已发货',
        '10':'已发货',
        '15':'交易完成',
        '20':'取消中',
        '21':'已取消',
        '25':'审核未通过(货到付款)'
      }
    },
    // @子类修改
    getExtraParam: function(data){
      return {type: __type__,
              key: __key__}
    }
  });
  return OrderList;

})