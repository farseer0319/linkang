/**
 * 档期管理列表
 * author hzxuyingshan(hzxu_yingshan@corp.netease.com)
 */

define([
  "text!./returnnote.html",
  "{pro}components/ListComponent.js"
  ], function(tpl, ListComponent){
  var ActList = ListComponent.extend({
    url: "/oms/returnOrder/list",
    name: "m-actlist",
    template: tpl,
    xdrOption:function(){
    	return {method:'POST'}
    },
    remove: function(index){
      this.data.list.splice(index,1)
      this.$emit('updatelist');
    }
  });
  return ActList;

})