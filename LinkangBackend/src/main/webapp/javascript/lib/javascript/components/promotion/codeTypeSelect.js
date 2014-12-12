/**
 * 条件筛选
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */



define([
  "{pro}components/notify/notify.js",
  "pro/extend/util",
  "text!./codeTypeSelect.html",
  "{pro}widget/BaseComponent.js",
  "pro/components/form/btnSelect"], 
    function(notify , _, tpl, BaseComponent, BtnSelect){

  var codeTypeSelect = BaseComponent.extend({
    name: "codetype-select",
    template: tpl,

    config: function(data){
      _.extend(data.couponVO, {codeType:"PUBLIC",binderType:"USER_BINDER"});
      this.configData(data);
    },
    
    // 配置参数
    configData: function(data){
    },
    
    // 检查并返回整理后的数据
    checkAndGetData: function(){
      var showError = this.showError;
      var data = this.data, valid = true;
      var coupon = data.couponVO, returnCoupon = {}; 
      returnCoupon.codeType = coupon.codeType;
      if(returnCoupon.codeType =="PUBLIC"){
    	  //优惠券代码校验
    	  if(!coupon.couponCode){
              valid = showError("优惠券代码不能为空" );
              valid = false;
          }else{
        	  returnCoupon.couponCode = coupon.couponCode;
          }
    	  //使用次数校验
    	  if(!coupon.times){
              valid = showError("使用次数不能为空" );
              valid = false;
          }else{
        	  returnCoupon.times = parseInt(coupon.times);
          }
    	  //用户名单校验
    	  returnCoupon.binderType = coupon.binderType;
    	  if(returnCoupon.binderType == "USER_BINDER"){
    		  if(!coupon.users){
                  valid = showError("用户名单不能为空" );
                  valid = false;
              }else{
            	  returnCoupon.users = coupon.users;
              }
    		  
    	  }
    	  //清空其他数据
    	  returnCoupon.randomCount = 0;
      }else{
    	  //申请次数校验
    	  if(!coupon.randomCount){
              valid = showError("申请次数不能为空" );
              valid = false;
          }else{
        	  returnCoupon.randomCount = parseInt(coupon.randomCount);
          }
    	  
    	  //清空其他数据
    	  returnCoupon.couponCode = "";
    	  returnCoupon.users = "";
    	  returnCoupon.times = 0;
      }
      if(!valid)return false;
      return returnCoupon;
    },
    showError: function(msg){

      notify.notify({
        type: "error",
        message: msg 
      })
      return false;
    }
    
  });


  return codeTypeSelect;

})