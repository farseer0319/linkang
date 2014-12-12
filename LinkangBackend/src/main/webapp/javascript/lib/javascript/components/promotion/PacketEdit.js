/**
 * 红包新建、编辑页
 * author jinze(jinze@corp.netease.com)
 */


define([
  "text!./packetEdit.html",
  "pro/extend/util",
  "pro/widget/BaseComponent",
  "pro/components/notify/notify",
  "pro/components/datepicker/datepicker"
], function(tpl, _, BaseComponent, notify){

  var numReg = /^\d+(\.\d+)?$/;

  var PacketEdit = BaseComponent.extend({
    name: "packet-edit",
    template: tpl,
    config: function(data){
      if(!data.vo){
        data.vo = {};
      }
      _.extend(data.vo, {
        name: "",
        description:""
      })
    },
    computed:{
      shareString:{
        get: function(data){
          if(data.vo.share === true){
            return "1";
          }else if(data.vo.share === false){
            return "0";
          }else{
            return undefined;
          }
        },
        set: function(value, data){
          if(value == "1"){
            data.vo.share = true;
          }else if(value == "0"){
            data.vo.share = false;
          }else{
            data.vo.share = undefined;
          }
        }
      }
    },
    // 表单字段验证规则
    _validators: {
      "name": function(name){
        if(!name) return "名字不能为空";
        if(name.length > 15) return "名字长度不能超过15"
      },
      "description": function(description){
        if(!description) return "描述不能为空";
        if(description.length > 60) return "描述长度不能超过60"
      },
      "share": function(share){
        if(share=== undefined) return "请选择是否分享"
      },
      "cash": function(cash){
        if(!cash) return "红包金额不能为空"
        if(!cash.match(numReg)) return "红包金额应该是数字"
      },
      "count": function(count, vo){
        if(vo.share === true){
          if(!count) return "红包数量不能为空"
          if(!count.match(/\d+/)) return "红包数量应该是整数"
        }
      },
      "distributeRule": function(distributeRule, vo){
        if(vo.share === true){
          if(!distributeRule) return "裂变方式不能为空"
        }
      },
      "copies": function(copies, vo){
        if(vo.share === true){
          if(!copies) return "裂变数量不能为空"
          if(!copies.match(/\d+/)) return "裂变数量应该是整数"
        }
      },
      "binderType": function(binderType, vo){
        if(vo.share === false){
          if(!binderType) return "绑定方式不能为空"
        }
      },
      "users": function(users, vo){
        if(vo.share === false){
          if(vo.binderType=='USER_BINDER'){
            if(!users) return "用户名单不能为空"
          }
        }
      }
    },
    confirm: function(){
      var data = this.data.vo,
          _valid = this.valid();
      if(_valid === true) this._save(data);
      else{
        notify.notify({
          message: _valid,
          type: "error",
          duration: 2000
        })
      }
    },
    valid: function(){
      var _key, _result;
      for(_key in this._validators){
        _result = this._validators[_key](this.data.vo[_key], this.data.vo);
        if (_result){
          return _result;
        }
      }
      return true;
    },
    _save:function(_data){

      this.$request('/packet/save',{
        method:'post',
        data:_data,
        onload:_callBack,
        onerror:_callBack
      });

      function _callBack(json){
        if(json && json.code === 200){
          notify.notify({
            type: "success",
            message: "保存红包成功, 三秒后跳转到活动列表"
          });
          setTimeout(function(){window.location= "/promotion/packet";},3000);
        }else{
          notify.notify({
            type: "error",
            message: json && json.message || "保存红包失败"
          });

        }
      }
    }
  });


  return PacketEdit;

})