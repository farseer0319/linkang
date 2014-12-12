/**
 * 账号页
 * author yuqijun(yuqijun@corp.netease.com)
 */

define(['{lib}base/util.js',
    '{lib}base/event.js',
    '{lib}base/element.js',
    '{pro}widget/module.js',
    '{lib}util/form/form.js',
    '{lib}util/file/select.js',
    '{pro}extend/request.js',
    '{pro}components/notify/notify.js',
    'util/ajax/xdr',
    'pro/extend/config',
    'util/data/region/zh',
    'util/region/zh',
    '{pro}lib/jquery/dist/jquery.min.js',
    '{pro}lib/jquery/dist/lightbox.min.js'
    ],
    function(ut,v,e,Module,ut1,s,Request,notify,j,c,t0,t1,jq,jql,p) {
        var pro;

        p._$$CreateModule = NEJ.C();
        pro = p._$$CreateModule._$extend(Module);
        
        pro.__init = function(_options) {
            this.__supInit(_options);
			this.__getNodes();
			this.__addEvent();
			this.webform = ut1._$$WebForm._$allocate({
	              form:this.form,
	              
	              oncheck:function(event){
	            	  
	              }._$bind(this)
	          });
			this.__initImage();
			t1._$$RegionSelector._$allocate({
				cache:t0._$$CacheRegionZH._$allocate(),
				province:this.form['returnProvince'],
				city:this.form['returnCity'],
				area:this.form['returnCountry'],
				data:{province:e._$dataset(this.form['returnProvince'],'default'),city:e._$dataset(this.form['returnCity'],'default'),area:e._$dataset(this.form['returnCountry'],'default')},
				onchange:this.__onRegionChange._$bind(this)
			})
        };
        
        pro.__onRegionChange = function(){
        	
        };
        pro.__initImage = function(){
        	var list = e._$getByClassName(this.form,'j-img');
        	for(var i=0,l=list.length;i<l;i++){
        		s._$bind(list[i], {
                    name: 'img',
                    multiple: false,
                    accept:'image/*',
                    parent:list[i].parentNode,
                    onchange: this.__onImageUpload._$bind(this,list[i])
                });
        	}
        	
        };
        pro.__onImageUpload = function(_label,event){
        	var name = e._$dataset(_label,'name');
        	var form = event.form;
        	form.action = c.UPLOAD_URL;
        	j._$upload(form,{onload:function(result){
        		//this.frontImg.src = result.result[0].imgUrl;
        		var list =  _label.parentNode.getElementsByTagName('img');
        		var errorNode = e._$getByClassName(_label.parentNode,'js-error');
    			if(errorNode.length){
    				e._$remove(errorNode[0].parentNode);
    			}
        		if(list.length){
        			list[0].src =  result.result[0].imgUrl;
        			list[0].parentNode.href= result.result[0].imgUrl;
        		} else{
        			var a = e._$create('a');
        			a.href=result.result[0].imgUrl;
        			e._$dataset(a,'lightbox',name);
        			var img = e._$create('img');
        			img.src= result.result[0].imgUrl;
        			a.appendChild(img);
        			_label.parentNode.insertAdjacentElement('afterBegin',a);
        		}
        		this.form[name].value =  result.result[0].imgUrl;
        		//this.__frontImage = result.result[0].imgUrl;
        	}._$bind(this),
        	onerror:function(e){
        		notify.show('上传图片可能超过2M');
        	}})
        	//e._$delClassName(this.lblParent.parentNode,'js-invalid');
        }
        
        pro.__getNodes = function(){
        	this.form = e._$get('dataform');
        	var list = e._$getByClassName(this.form,'j-flag');
        	
        };
        
        pro.__addEvent = function(){
        	v._$addEvent('submit','click',this.__onFormSubmit._$bind(this));
            
        };
        pro.__onFormSubmit = function(){
        	var pass = this.webform._$checkValidity();
        	var pass1 = this.__validImage();
        	if(pass&&pass1){
        		var data = this.webform._$data();
               Request('/business/create/account',{
        			data:ut._$object2query(data),
                    norest:true,
        			method:'POST',
                    type:'JSON',
        			onload:this.__cbCreateAccount._$bind(this),
        			onerror:this.__onError._$bind(this)
        		})
        	}
        };
        pro.__validImage = function(){
        	var list = e._$getByClassName(this.form,'j-img');
        	var valid = true;
        	for(var i=0,l=list.length;i<l;i++){
        		var ipt = list[i].parentNode.parentNode.getElementsByTagName('input')[1];
        		if(ipt.value==''){
        			var errorNode = e._$getByClassName(ipt.parentNode,'js-error');
        			if(!errorNode.length){
        				var div = e._$create('div');
            			div.innerHTML ='<span class="js-error">'+ e._$dataset(ipt,'message')+'</span>';
            			list[i].parentNode.appendChild(div);		
        			}
        			e._$addClassName(ipt.parentNode,'js-invalid');
        			valid = false;
        		} else{
        			e._$delClassName(ipt.parentNode,'js-invalid');
        		}
        	}
        	return valid;
        };
        pro.__cbCreateAccount = function(result){
        	if(result.code==200){
        		location.href='/business/account'
        	} else{
        		notify.showError(result.result.msg);
        	}
        }
        pro.__onError = function(){
        	notify.showError('系统错误');
        };
        p._$$CreateModule._$allocate();
    });