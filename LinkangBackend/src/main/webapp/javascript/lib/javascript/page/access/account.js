/**
 * xx平台首页
 * author xxxx(xxxx@corp.netease.com)
 */

define(['{lib}base/util.js',
    '{lib}base/event.js',
    '{lib}base/element.js',
    '{lib}util/template/jst.js',
    '{pro}widget/module.js',
    '{pro}page/access/account/accountlist.js',
    '{pro}extend/request.js'
    ],
    function(_ut,_v,_e,e2,Module,AccountList,Request,p) {
        var pro;
        
        p._$$AccountModule = NEJ.C();
        pro = p._$$AccountModule._$extend(Module);
        
        pro.__init = function(_options) {
            _options.tpl = 'jstTemplate';
            this.__initList();
            this.__initAdminList();
            this.__initAreaList();
            this.__supInit(_options);
            this.__getNodes();
            this.__addEvent();
        };
        pro.__initList = function(){
            if(!this.__accountList){
                this.__accountList = new AccountList({})
                    .$inject('.j-list', "after")
            }
        };
        pro.__initAreaList = function(){
            Request('account/getAreaList',{
                onload:function(json){
                    window.__SiteList__ = json.result.list;
                },
                onerror:function(e){
                    console.log(e);
                }
            })
        }
        pro.__initAdminList = function(){
            Request('account/getAdminList',{
                onload:this.__getAdminList._$bind(this),
                onerror:function(e){
                    console.log(e);
                }
            })
        };
        pro.__getAdminList = function(json){
            window.__AdminList__ = json.result.list;
        };
        pro.__getNodes = function(){

        }
        pro.__addEvent = function(){
            
        }
        p._$$AccountModule._$allocate();
    });