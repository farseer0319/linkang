/*
 * ------------------------------------------
 * 红包列表
 * @version  1.0
 * @author   cheng-lin(cheng-lin@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'pro/extend/util',
    'pro/widget/BaseComponent',
    'text!./red.html'
],function(_,BaseComponent,_html0){

    var red = BaseComponent.extend({
        url:'/user/redPocket',
        name: 'm-user-info-red',
        template: _html0,
        config: function(data){
          _.extend(data, {
            currentState:'active',
            result: {}
          });
        },
        init: function(){
          // 需要自定义复杂的更新策略, $emit('updatelist')事件即可
          //this.$on('updatelist', this.getList.bind(this));
          this.getList();
        },

        setCurrentState : function(state){
          this.data.currentState = state;
          this.data.list = this.data.result[state];
          // this.getList(state);
        },

        //获取数据
        getList: function(){
          var data = this.data;
          console.log(data);
          this.$request(this.url, {
            data: {userId:this.data.userid},
            onload: function(json){
              data.result = json.result;
              data.list = json.result[this.data.currentState];
            },
            // test
            onerror: function(json){
              // @TODO: remove
            }
          });
        }
    })

    return red;
});