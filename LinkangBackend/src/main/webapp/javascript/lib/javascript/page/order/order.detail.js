/**
 * xx平台首页
 * author hzwujingfei(hzwujingfei@corp.netease.com)
 */

define(['{lib}base/util.js',
    '{lib}base/event.js',
    '{lib}base/element.js',
    '{pro}widget/module.js',
    '{pro}components/order/packlist.js',
    '{pro}components/order/pdlist.js',
    '{pro}components/order/invoicelist.js',
    '{pro}components/order/win/cancel.order.win.js',
    '{pro}components/order/win/delivery.address.win.js',
    '{pro}components/order/win/add.invoice.win.js',
    '{lib}util/form/form.js',
    '{lib}util/template/jst.js',
    '{pro}components/notify/notify.js',
    '{pro}extend/request.js'],
    function(ut,v,e,Module,PackList,PdList,InvoiceList,CancelOrderWin,AddressWin,InvoiceWin,_t,e2,notify,Request,p) {
        var pro;

        p._$$OrdDetailModule = NEJ.C();
        pro = p._$$OrdDetailModule._$extend(Module);
        
        pro.__init = function(_options) {
            _options.tpl = 'jstTemplate';
            this.__checkInvoice();
            this.__supInit(_options);
            this.__initInvoice();
            this.__getNodes();
            this.__addEvent();
        };
        pro.__checkInvoice = function(){
            if(!!window.__invoice__.hasInvoice){
                this.__isEditInvoice = true;
                this.__invoiceBox = 'invoice-edit-box';
            }else{
                this.__isEditInvoice = false;
                this.__invoiceBox = 'invoice-add-box';
            }
        }
        pro.__initInvoice = function(){
            if(window.__invoice__.hasInvoice && !window.__invoice__.yiKaiPiao){
                e2._$render('invoice-edit-box','invoice-edit',{item:window.__invoice__});
            }
        };
        pro.__getNodes = function(){
            var _list = e._$getByClassName(document,'j-flag');
            this.__cancelOrder = e._$get('cancelOrder');
            this.__openReturn = e._$get('openReturn');
            this.__editAddress = e._$get('addressEdit');
            this.__addInvoice = e._$get('invoiceAdd');
            this.__editInvoice = e._$get('invoiceEdit');
        };
        pro.__addEvent = function(){
            v._$addEvent(this.__cancelOrder,'click',this.__onCancelOrderClick._$bind(this));
            v._$addEvent(this.__openReturn,'click',this.__onOpenReturnClick._$bind(this));
            v._$addEvent(this.__editAddress,'click',this.__onEditAddrClick._$bind(this));
            v._$addEvent(this.__addInvoice,'click',this.__onEditInvoiceClick._$bind(this));
            v._$addEvent(this.__editInvoice,'click',this.__onEditInvoiceClick._$bind(this));
        };
        pro.__onCancelOrderClick = function(_event){
            v._$stop(_event);
            if(!!this.__cancelOrderWin){
                this.__cancelOrderWin._$recycle();
            }
            this.__cancelOrderWin = CancelOrderWin._$allocate({parent:document.body,onok:this.__onCancelOK._$bind(this)})._$show();
        };
        pro.__onOpenReturnClick = function(){
            var data = {};
            data['userId'] = window.__basicInfo__.userId;
            data['orderId'] = window.__basicInfo__.orderId;
            Request('/order/query/orderdetail/reopenreturn',{
                data:data,
                onload:function(){
                    notify.show({
                        'type':'success',
                        'message':'成功'
                    });
                },
                onerror:function(){
                    notify.show({
                        'type':'error',
                        'message':'失败'
                    });
                }
            })
        };
        pro.__onEditAddrClick = function(_event){
            v._$stop(_event);
            if(!!this.__addressWin){
                this.__addressWin._$recycle();
            };
            var address = this.__getAddress();
            this.__addressWin = AddressWin._$allocate({parent:document.body,type:1,address:address,onok:this.__addressSave._$bind(this)})._$show();
            this.__deliveryForm = _t._$$WebForm._$allocate({form:'webForm'});
        };
        pro.__getAddress = function(){
            var address = {};
            if(!!this.__addr){
                address = this.__addr;
            }else{
                address = {
                    consigneeName: window.__address__.name,
                    address: window.__address__.address,
                    consigneeMobile: window.__address__.mobile,
                    consigneeTel: window.__address__.phone,
                    province: window.__address__.province,
                    city: window.__address__.city,
                    section: window.__address__.section,
                    street: window.__address__.street
                };
            }
            return address;
        }
        pro.__onEditInvoiceClick = function(_event){
            v._$stop(_event);
            if(!!this.__invoiceWin){
                this.__invoiceWin._$recycle();
            }
            this.__invoiceWin = InvoiceWin._$allocate({parent:document.body,onok:this.__invoiceSave._$bind(this)})._$show();
            this.__invoiceForm = _t._$$WebForm._$allocate({form:'invoiceForm'});
        };
        pro.__onCancelOK = function(rtype){
            var data = {},
                self = this;
            data['rtype'] = rtype;
            data['userId'] = window.__basicInfo__.userId;
            data['orderId'] = window.__basicInfo__.orderId;
            Request('/order/query/orderdetail/delete',{
                data:data,
                onload:function(json){
                    notify.show('成功');
                    self.__cancelOrderWin._$hide();
                    window.location.reload();
                },
                onerror:function(){
                    notify.show({
                        'type':'error',
                        'message':'失败'
                    });
                }
            })
        };
        pro.__addressSave = function(addr){
            var _data = {},
                self = this;
            _data['userId'] = window.__basicInfo__.userId;
            _data['orderId'] = window.__basicInfo__.orderId;
            _data['chgParam'] = this.__changeData(addr);
            Request('/order/query/orderdetail/setAddress',{
                data:_data,
                method:'POST',
                type:'JSON',
                onload: function(json){
                    if(json.code == 200){
                        notify.show('成功');
                        self.__addr = _data['chgParam'];
                        self.__setAddress(_data['chgParam']);
                        self.__addressWin._$hide();
                    }
                },
                onerror: function(){
                    notify.show({
                        'type':'error',
                        'message':'修改地址失败'
                    });
                }
            });
        };
        pro.__setAddress = function(addr){
            var _list = e._$getByClassName(document,'j-addr');
            _list[0].innerText = addr.consigneeName;
            _list[1].innerText = addr.consigneeMobile + '   ' + addr.consigneeTel;
            _list[2].innerText = addr.province + addr.city + addr.section + addr.street + addr.address;
        };
        //后台不支持传省市区街道的id,addr参数去掉id
        pro.__changeData = function(addr){
            return {
                address: addr.address,
                city: addr.city,
                consigneeMobile: addr.consigneeMobile,
                consigneeName: addr.consigneeName,
                consigneeTel: addr.consigneeTel,
                province: addr.province,
                section: addr.section,
                street: addr.street
            };
        }
        pro.__invoiceSave = function(){
            if(this.__invoiceForm._$checkValidity()){
                var _data  = this.__invoiceForm._$data(),
                    self   = this;
                _data['orderId'] = window.__basicInfo__.orderId;
                _data['userId'] = window.__basicInfo__.userId;
                _data['associated'] = e._$get('invoiceForm').isVAT.checked;

                if(!!this.__isEditInvoice){
                    Request('/order/query/orderdetail/updateInvoice',{
                        data:_data,
                        onload:function(json){
                            window.__invoice__.title = _data['title'];
                            e2._$render(self.__invoiceBox,'invoice-edit',{item:window.__invoice__});
                            v._$addEvent('invoiceEdit','click',self.__onEditInvoiceClick._$bind(self));
                            notify.show('成功');
                            self.__invoiceWin._$hide();
                        },
                        onerror:function(e){
                            notify.show({
                                'type':'error',
                                'message':'修改发票失败'
                            });
                        }
                    })
                }else{
                    Request('/order/query/orderdetail/addInvoice',{
                        data:_data,
                        onload:function(json){
                            window.__invoice__.title = _data['title'];
                            e2._$render(self.__invoiceBox,'invoice-edit',{item:window.__invoice__});
                            v._$addEvent('invoiceEdit','click',self.__onEditInvoiceClick._$bind(self));
                            self.__isEditInvoice = true;
                            notify.show('成功');
                            self.__invoiceWin._$hide();
                        },
                        onerror:function(e){
                            notify.show({
                                'type':'error',
                                'message':'补开发票失败'
                            });
                        }
                    })
                }
            };
        };
        p._$$OrdDetailModule._$allocate();
    });