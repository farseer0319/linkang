/**
 * 优惠券弹窗选择列表
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */


define([
  "text!./couponSelect.html",
  "{pro}components/ListComponent.js",
  "{pro}components/modal/modal.js",
  ], function(selectTpl ,ListComponent, Modal){


  var PoModal = Modal.extend({
    name: "coupon-modal",
    data: {
      title: "选择优惠券"
    },
    content: "<coupon-select select={{select}}></coupon-select>",
    init: function(){
      this.supr();
    }
  });

  // * 私有组件
  // * 优惠券弹窗选择列表

  var CouponSelect  = ListComponent.extend({
    url: "/src/data/coupon.json",
    template: selectTpl ,
    getExtraParam: function(data){
      return { status: data.status }
    },
    select: function(coupon){
      var data = this.data;
      data.select = coupon
    }
  })

  PoModal.component("coupon-select", CouponSelect);

  return PoModal;

})