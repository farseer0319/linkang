/**
 * 订单列表筛选
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define([
  "text!./accountlist.html",
  "{pro}components/ListComponent.js",
  '{pro}page/access/account/add.account.win.js',
  '{pro}page/access/account/delete.win.js',
  '{pro}components/notify/notify.js',
  '{pro}extend/request.js'
  ], function(tpl, ListComponent, AccountWin, DeleteWin, notify, Request){
  var AccountList = ListComponent.extend({
    url: "/access/account/getlist",
    name: "m-accountlist",
    notMerge:true,
    template: tpl,
    // @子类修改
    edit: function(item){
      if(!item){ //add
        this.showWin(item);
      }else{ //edit
        var data = {};
        data['id'] = item.id;
        Request('account/edit',{
          data:data,
          onload:this.getItem._$bind(this),
          onerror: function(e){
            console.log(e);
          }
        })
      }
      
    },
    getItem: function(json){
      if(json.code == 200){
        var item = json.result;
        this.showWin(item);
      }
    },
    showWin: function(item){
      if(!!this.__accountWin){
        this.__accountWin._$recycle();
      }

      this.__accountWin = AccountWin._$allocate({
        parent:document.body,
        item:item,
        onok:this.onAddOK._$bind(this)
      })._$show();
    },
    remove: function(item){
      if(!!this.__deleteWin){
        this.__deleteWin._$recycle();
      }
      this.__deleteWin = DeleteWin._$allocate({
        parent:document.body,
        onok:this.onDelOK._$bind(this,item)
      })._$show();
    },
    onDelOK: function(item){
      var data = {};
      data['id'] = item.id;
      Request('account/delete',{
        data:data,
        onload:this.deleteSuccess._$bind(this),
        onerror: function(e){
          notify.showError('删除失败');
        }
      });
    },
    deleteSuccess: function(json){
      if(json.code == 200){
        this.$emit('updatelist');
      };
      this.__deleteWin._$hide();
    },
    lock: function(item){
      var data = {};
      data['id'] = item.id;
      Request('account/lock',{
        data:data,
        onload:this.updateList._$bind(this),
        onerror: function(e){
          console.log(e);
        }
      })
    },
    unlock: function(item){
      var data = {};
      data['id'] = item.id;
      Request('account/unlock',{
        data:data,
        onload:this.updateList._$bind(this),
        onerror: function(e){
          console.log(e);
        }
      })
    },
    updateList: function(json){
      if(json.code == 200){
        this.$emit('updatelist');
      }
    },
    onAddOK: function(){
      this.__accountWin._$hide(); 
      this.$emit('updatelist');
    }
  });
  return AccountList;

})