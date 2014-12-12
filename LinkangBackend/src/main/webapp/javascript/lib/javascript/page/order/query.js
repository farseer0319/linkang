/**
 * xx平台首页
 * author xxxx(xxxx@corp.netease.com)
 */

define(['{lib}base/util.js',
        '{lib}base/event.js',
        '{lib}base/element.js',
        '{pro}widget/module.js',
        '{pro}extend/request.js',
        '{pro}components/notify/notify.js'],
    function(ut,v,e,Module,Request,notify,p,o,f,r) {
        var pro;

        p._$$QueryModule = NEJ.C();
        pro = p._$$QueryModule._$extend(Module);
        
        pro.__init = function(_options) {
            this.__supInit(_options);
			this.__getNodes();
			this.__addEvent();
        };
        
        pro.__getNodes = function(){
            var _list = e._$getByClassName(document,'j-flag');
            this.__orderQueryType = _list[0];
            this.__orderIpt = _list[1]
            this.__orderQuery = _list[2];
            this.__userQueryType = _list[3];
            this.__userIpt = _list[4];
            this.__userQuery = _list[5];
        };
        
        pro.__addEvent = function(){
            v._$addEvent(this.__orderQueryType,'click',this.__onTypeBoxClick._$bind(this,this.__orderQueryType));
            v._$addEvent(this.__userQueryType,'click',this.__onTypeBoxClick._$bind(this,this.__userQueryType));
            v._$addEvent(this.__orderQuery,'click',this.__onSubmitBtnClick._$bind(this,this.__orderQueryType,this.__orderIpt));
            v._$addEvent(this.__userQuery,'click',this.__onSubmitBtnClick._$bind(this,this.__userQueryType,this.__userIpt));
        };
        //tab逻辑实现
        pro.__onTypeBoxClick = function(_box,_event){
            var _elm = v._$getElement(_event);
            var _list = _box.getElementsByTagName('LI');
            for(var i=0,len=_list.length; i<len; i++){
                e._$delClassName(_list[i],'onli');
            }
            if(_elm.tagName == 'LI'){
                e._$addClassName(_elm,'onli');
            }
        }
        //提交数据
        pro.__onSubmitBtnClick = function(_box,_ipt){
            var _data = {},
                _list = _box.getElementsByTagName('LI');
            for(var i=0,len=_list.length; i<len; i++){
                if(!!e._$hasClassName(_list[i],'onli')){
                    _data['option'] = e._$dataset(_list[i],'option');
                    _data['type'] = parseInt(e._$dataset(_list[i],'type'));
                }
            }
            _data['value'] = _ipt.value;
            if(!!_data['type'] == 0){
                this.__check(_data);
            }else{
                this.__route(_data);
            }
        };
        pro.__route = function(_data){
            switch(_data['type']){
                case 0:
                    window.location.href = '/order/orderdetail?type='+_data['option']+'&key='+_data['value'];
                    break;
                case 1:
                    window.location.href = '/order/tradedetail?type='+_data['option']+'&key='+_data['value'];
                    break;
                case 2:
                    window.location.href = '/order/orderlist?type='+_data['option']+'&key='+_data['value'];
                    break;
            }
        };
        pro.__check = function(data){
            var _data = {},
                self = this;
            _data['type'] = data.option;
            _data['value'] = data.value;
            Request('/order/query/check',{
                data:_data,
                onload:function(json){
                    if(json.code == 200){
                        self.__route(data);
                    }else if(json.code == 202){
                        notify.show({
                            'type':'error',
                            'message':'查询的内容不存在！'
                        })
                    }
                },
                onerror:function(e){
                    notify.show({
                        'type':'error',
                        'message':'检查失败！'
                    })
                }
            });
        }

        p._$$QueryModule._$allocate();
    });