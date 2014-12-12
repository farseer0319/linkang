/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./returnstore.list.html",
  "{pro}components/ListComponent.js"
  ], function(tpl, ListComponent){
  var PdList = ListComponent.extend({
    url: "/src/javascript/components/order/returnstore.list.json",
    name: "m-productlist",
    template: tpl,
    // xdrOption: function(){
    //   return {method:'POST'}
    // },
    remove: function(index){
      this.data.list.splice(index,1)
      this.$emit('updatelist');
    }
  });
  return PdList;

})