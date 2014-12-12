/**
 * xx平台首页
 * author xxxx(xxxx@corp.netease.com)
 */

define(['{lib}base/util.js'
        ,'{lib}base/event.js'
        ,'{lib}base/element.js'
        ,'{pro}widget/module.js'
        ,'{pro}widget/ui/calendar/calendar.js'
        ,'{lib}util/form/form.js'
        ,'{pro}extend/request.js'
        , '{lib}ui/datepick/datepick.js'
        , '{pro}components/notify/notify.js'],
    function(ut,v,e,Module,Calendar,ut1,request,ut2,notify,p,o,f,r) {
        var pro;
        
        p._$$CreateModule = NEJ.C();
        pro = p._$$CreateModule._$extend(Module);
        
        pro.__init = function(_options) {
            this.__supInit(_options);
			this.__getNodes();
			this.__addEvent();
            //this.__initCalender();
            this.webform = ut1._$$WebForm._$allocate({
              form:this.form
          });
            this.__onProvinceChange();
        };
        
        pro.__getNodes = function(){
          var node = e._$get('pocreate');
          var list = e._$getByClassName(node,'j-flag');
          this.province = list[0];
          this.form = e._$get('dataform');
        };
       
        pro.__addEvent = function(){
           v._$addEvent('submit','click',this.__onSubmitData._$bind(this,true));
           v._$addEvent('save','click',this.__onSubmitData._$bind(this,false));
           v._$addEvent(this.form.startTime,'click',this.__onDatePickClick._$bind(this));
           
           v._$addEvent(this.form.curSupplierAreaId,'change',this.__onProvinceChange._$bind(this));
        };
        
        pro.__onProvinceChange = function(){
        	var curSupplierAreaId = this.form.curSupplierAreaId.options[this.form.curSupplierAreaId.selectedIndex].value;
        	request('/schedule/brand/province',{
        		data:{curSupplierAreaId:curSupplierAreaId},
        		type:'json',
        		onload:this.__cbBrandGet._$bind(this),onerror:f})
        };
        
        pro.__cbBrandGet = function(result){
        	if(result.code==200){
        		this.__initSelect(result.result.list,this.form.brandId);
        	}
        };
        pro.__initSelect = function(list,select){
        	select.options.length = 0;
        	var defaultId = e._$dataset(select,'dft'),index =-1;
        	
        	for(var i=0,l=list.length;i<l;i++){
        		if(list[i].brandId==defaultId){
        			index = i;
        		}
        		var option = new Option(list[i].brandNameZh,list[i].brandId);
        		select.options.add(option);
        	}
        	if(index!=-1){
        		select.selectedIndex = index;
        	}
        }
        pro.__onDatePickClick = function(event){
        	v._$stop(event);
        	if(this.datePick){
				this.datePick = this.datePick._$recycle();
			}
			this.datePick = ut2._$$DatePick._$allocate({parent:this.form.startTime.parentNode,
								clazz:'m-datepick',
								onchange:this.__onDateChange._$bind(this)})
        };
        pro.__onDateChange = function(date){
        	this.form.startTime.value = ut._$format(date,'yyyy-MM-dd');
        };
        pro.__onSubmitData = function(_isSubmit){
        if(this.webform._$checkValidity()){
            var data = this.webform._$data();
            var sendData ={};
            sendData.cowork = {};
            sendData.adPosition = data.adPosition;
            sendData.cowork.cPrice = data['cowork.cPrice'];
            sendData.cowork.deposit = data['cowork.deposit'];
            sendData.cowork.grossProfitRate = data['cowork.grossProfitRate'];
            sendData.cowork.maxPriceAfterDiscount = data['cowork.maxPriceAfterDiscount'];
            sendData.cowork.minPriceAfterDiscount = data['cowork.minPriceAfterDiscount'];
            sendData.cowork.mortgageRate = data['cowork.mortgageRate'];
            sendData.cowork.platformSrvFeeRate = data['cowork.platformSrvFeeRate'];
            sendData.cowork.unlossFlag = data['cowork.unlossFlag']=='1'?true:false;
            
            
            sendData.prdDetail = {};
            sendData.prdDetail.maxDiscount = data['prdDetail.maxDiscount'];
            sendData.prdDetail.minDiscount = data['prdDetail.minDiscount'];
            sendData.prdDetail.productTotalCnt = data['prdDetail.productTotalCnt'];
            sendData.prdDetail.skuCnt = data['prdDetail.skuCnt'];
            sendData.prdDetail.unitCnt = data['prdDetail.unitCnt'];
            
            sendData.storeSaleInfo = {};
            sendData.storeSaleInfo.storeAreaId = data['storeAreaId']
            sendData.storeSaleInfo.saleAreaId = data['saleAreaId']
            sendData.storeSaleInfo.jitMode = data['jitMode'];
            
            sendData.brandId = data.brandId;
            sendData.curSupplierAreaId = data.curSupplierAreaId;
            
            //sendData.cPrice = data.cPrice;
            //sendData.sellSiteId = parseInt(data.brandId);
            //sendData.siteId = parseInt(data.siteId);
            sendData.startTime = data.startTime;
            sendData.title = data.title;
            if(data.id){
            	sendData.id = data.id;
            }
            if(_isSubmit){
            	request('/schedule/create/add',{
                	data:sendData,
                	method:'POST',
                	onload:this.__onCbCreate._$bind(this),
                	onerror:this.__onError._$bind(this)})
            } else{
            	request('/schedule/create/save',{
                	data:sendData,
                	method:'POST',
                	onload:function(_json){
                		if(_json.code==200){
                			notify.show('保存成功')
                			location.href='/schedule/schedulelist';
                		} else{
                			notify.show('保存失败')
                		}
                	},
                	onerror:function(){
                		notify.show('保存失败')
                	}})
            }
            
        }

        };
        pro.__onCbCreate = function(result){
        	if(result.code==200){
        		location.href='/schedule/schedulelist'
        	}
        }
        pro.__onError = function(){
        	
        }
        p._$$CreateModule._$allocate();
    });