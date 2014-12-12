/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./returnlist.html",
  "{pro}components/ListComponent.js",
  "{lib}base/element.js",
  "{pro}extend/request.js",
  "pro/components/notify/notify",
  "pro/components/order/win/reject.win",
  "pro/components/order/win/return.pass.win",
  "pro/components/order/win/topay.pass.win",
  "lib/util/form/form"
  ], function(tpl, ListComponent, e, Request, notify, RejectWin, PassWin, GobackWin, _t){

  var ReturnList = ListComponent.extend({
    url: "/order/return/getlist",
    name: "m-returnform",
    template: tpl,
    data: {
      status:0,
      typeList:__typeList__,
      statusMap:{
        0:"全部",
        6:"待收货",
        11:"异常件待退款",
        9:"拒绝",
        8:"已退款",
        10:"已取消"
      }
    },
    // @子类修改
    getExtraParam: function(data){
      return {
        status: data.status,
        timeRange:{
          startTime: data.startTime,
          endTime: data.endTime
        },
        search:{
          searchType:data.searchType,
          searchKey:data.searchKey
        },
        tag:data.tag
      }
    },
    xdrOption: function(){
      return {method:'POST'}
    },
    search: function(tag){
      var list = e._$getByClassName('searchbox','j-flag');
      this.data['searchType'] = list[0].value;
      this.data['searchKey'] = list[1].value;
      this.data['tag'] = tag;
      this.$emit('updatelist');
    },
    reject: function(item){
      if(!!this.rejectWin){
        this.rejectWin._$recycle();
      }
      this.rejectWin = RejectWin._$allocate({parent:document.body,onok:this.onRejectOK._$bind(this,item)})._$show();
    },
    onRejectOK: function(item){
      var form = _t._$$WebForm._$allocate({
        form:'rejectForm'
      });
      if(form._$checkValidity()){
        var data = form._$data();
        data['userId'] = item.userId;
        data['retId'] = item.retId;
        Request('/order/return/reject',{
          data: data,
          method:'POST',
          onload: this.rejectSuccess._$bind(this),
          onerror: function(){
            notify.showError('拒绝错误');
          }
        });
      };
    },
    rejectSuccess: function(json){
      notify.show('拒绝成功');
      this.$emit('updatelist');
      this.rejectWin._$hide();
    },
    pass: function(item){
      if(!!this.PassWin){
          this.PassWin._$recycle();
      }
      this.PassWin = PassWin._$allocate({title:'通过',parent:document.body,onok:this.onPassOK._$bind(this,item)})._$show();
    },
    onPassOK: function(item){
      var form = _t._$$WebForm._$allocate({
        form:'passForm'
      });
      if(form._$checkValidity()){
        var data = form._$data();
        data['userId'] = item.userId;
        data['retId'] = item.retId;
        Request('/order/return/pass',{
          data:data,
          method:'POST',
          onload:this.passSucess._$bind(this),
          onerror:function(){
            notify.showError('退款失败');
          }
        })
      }
    },
    passSucess: function(json){
      notify.show('退款成功');
      this.$emit('updatelist');
      this.PassWin._$hide();
    },
    goback: function(item){
      if(!!this.gobackWin){
          this.gobackWin._$recycle();
      }
      this.gobackWin = GobackWin._$allocate({title:'撤销',parent:document.body,onok:this.onGobackOK._$bind(this,item)})._$show();
    },
    onGobackOK: function(item){
      var data = {},
          self = this;
      data['retId'] = item.retId;
      data['userId'] = item.userId;
      Request('/order/return/goback',{
        data:data,
        method:'POST',
        onload:function(json){
          notify.show('退款成功');
          self.$emit('updatelist');
          self.gobackWin._$hide();
        },
        onerror:function(e){
          notify.showError('撤销失败');
        }
      })
    }
  });
  return ReturnList;

})