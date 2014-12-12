/*
 * --------------------------------------------
 * xx窗体控件实现
 * @version  1.0
 * @author   author(author@corp.netease.com)
 * --------------------------------------------
 */
define(
		[ '{lib}base/util.js'
		 ,'{lib}base/event.js'
		 ,'{lib}base/element.js'
		 ,'{lib}util/event.js'
		 ,'{lib}util/template/jst.js'
		 ,'{lib}util/template/tpl.js'
		 ,'{pro}widget/layer/window.js'
		 ,'{pro}extend/request.js'
		 ,'{lib}util/form/form.js'
		 ,'{pro}components/notify/notify.js'],
		function(u, v, e, t, e2, e3, Window, Request, _t, notify, p, o, f, r) {
			var pro;
			/**
			 * 所有分类卡片
			 *
			 * @class   {nm.l._$$AddUserGroupWin}
			 * @extends {nm.l._$$CardWrapper}
			 *
			 *
			 */
			p._$$AddUserGroupWin = NEJ.C();
			pro = p._$$AddUserGroupWin._$extend(Window);
			/**
			 * 控件重置
			 * @protected
			 * @method {__reset}
			 * @param  {Object} options 可选配置参数
			 *                           clazz
			 *                           draggable
			 *                           mask
			 */
			pro.__reset = function(options) {
				var formData = options.item;
				if(!formData){
					options.title = '添加帐号';
					formData = {};
					this.__isAdd = 1;
					this.__itemId = 0;
				}else{
					options.title = '修改帐号';
					this.__itemId = formData.id;
					this.__selectedRoleList = options.item.roleList;
					this.__isAdd = 0;
				}
				formData['adminList'] = __AdminList__;
				e3._$getNodeTemplate('add-account-win-box');
				e2._$render(this.__body, 'add-account-win',{item:formData});
				this.__initForm();
				this.__initRoleList();
				this.__addEvent();
				this.__super(options);
			};
			pro.__initRoleList = function(){
				this.__form = e._$get('webForm');
				this.__adminId = parseInt(this.__form.adminId.value);
				// data['siteList'] = window.__SiteList__;
				this.__getRoleList();
			};
			pro.__getRoleList = function(){
				var data = {};
				data['id'] = this.__adminId;
				Request('account/getRoleList',{
					data:data,
					onload:this.__packRoleData._$bind(this),
					onerror:function(e){
						console.log(e);
					}
				})
			};
			pro.__packRoleData = function(json){
				var data = {};
				this.__dataList = [];
				this.__siteList = __SiteList__;
				this.__roleList = json.result.list;
				data['siteList'] = this.__siteList;
				data['roleList'] = this.__roleList;
				this.__dataModule = data;
				this.__dataList.push(data);
				var list = this.__dataList;
				if(!this.__isAdd){
					list = this.__setRoleList();
				}
				this.__renderRoleList(list);
			};
			pro.__setRoleList = function(){
				return this.__dataChange(this.__selectedRoleList);
			};
			//刷新角色列表
			pro.__renderRoleList = function(list){
				e2._$render('account-roleList-box', 'account-roleList',{items:list});
			}
			pro.__initForm = function(){
				this.__Form = _t._$$WebForm._$allocate({
					form:'webForm'
				});
			};
			pro.__addEvent = function(){
				var list = e._$getByClassName(this.__body, 'j-flag');
				v._$addEvent(list[0], 'change', this.__onAdminSelect._$bind(this));
				v._$addEvent(list[1], 'click', this.__onRoleListClick._$bind(this));
				v._$addEvent(list[2], 'click', this.__onAddRoleClick._$bind(this));
				v._$addEvent(list[3], 'click', this.__onOKClick._$bind(this));
				v._$addEvent(list[4], 'click', this.__onCClick._$bind(this));
			};
			pro.__onAdminSelect = function(){
				this.__initRoleList();
			};
			pro.__onRoleListClick = function(event){
				var elm = v._$getElement(event),
						dataList = this.__saveRoleList(),
						index;
				if(e._$hasClassName(elm,'j-del')){
					v._$stop(event);
					dataList = this.__dataChange(dataList);
					index = parseInt(e._$dataset(elm,'index'));
					dataList.splice(index,1);
					this.__renderRoleList(dataList);
				}
			};
			pro.__onAddRoleClick = function(event){
				v._$stop(event);
				var dataList = this.__saveRoleList()
						data = {};
				dataList = this.__dataChange(dataList);
				dataList.push(this.__dataModule);
				this.__renderRoleList(dataList);
			}
			pro.__dataChange = function(list){
				var data = [];
				for(var i=0,len=list.length;i<len;i++){
					var newModule = {},
							selectedIds = list[i].siteList,
							siteList;
					siteList = this.__addCheck(selectedIds);
					newModule['siteList'] = siteList;
					newModule['roleList'] = this.__roleList;
					newModule['id'] = list[i].id;
					data.push(newModule);
				}
				return data;
			}
			pro.__addCheck = function(selectedList){
				//数组深拷贝
				var sitelist = this.__siteList;
				var list = [];
				for(var k=0,len3=sitelist.length;k<len3;k++){
					var item = {};
					item['id'] = sitelist[k]['id'];
					item['name'] = sitelist[k]['name'];
					list.push(item);
				}
				for(var j=0,len2=selectedList.length;j<len2;j++){
					for(var i=0,len=list.length;i<len;i++){
						if(list[i].id == selectedList[j].id){
							list[i]['checked'] = true;
						}
					}
				}
				return list;
			}
			pro.__saveRoleList = function(){
				var data    = [],
						roleBox = e._$get('account-roleList-box'),
						liList    = e._$getByClassName(roleBox,'j-li');
				//循环遍历
				for(var i=0,len=liList.length;i<len;i++){
					var checkedList = [],
							item = {},
							chekList = e._$getByClassName(liList[i],'j-check'),
							selectId = liList[i].getElementsByTagName('SELECT');
					for(var j=0,chkLen=chekList.length;j<chkLen;j++){
						if(chekList[j].checked){
							checkedList.push({"id":chekList[j].id});
						}
					}
					item['id'] = selectId[0].value;
					item['siteList'] = checkedList;
					data.push(item);
				}
				return data;
			}
			pro.__onCClick = function() {
				// this.tree._$clearTree();
				this._$hide();
			};
			pro.__onOKClick = function(event) {
				if(this.__Form._$checkValidity()){
					var data = this.__packData();
					if(data != 0){
						Request('account/save',{
							data:data,
							progress:{},
							method:'POST',
							type:'JSON',
							onload:this.__submitOK._$bind(this,data),
							onerror:function(e){
								if(e.code == 601){
									notify.show({
										'type':'error',
										'message':e.message
									});
								}
							}
						})
					}
				}
			};
			pro.__submitOK = function(data,json){
				if(json.code == 200){
					this._$dispatchEvent("onok");
				}
			}
			pro.__packData = function(){
				var data = this.__Form._$data();
				data['roleList'] = this.__saveRoleList();
				if(!!this.__itemId) data['id'] = this.__itemId;
				if(!data['roleList'].length){
					notify.show({
						'type':'error',
						'message':'必须选择角色！'
					})
					return 0;
				};
				for(var i=0,len=data['roleList'].length;i<len;i++){
					if(!data['roleList'][i].siteList.length){
						notify.show({
							'type':'error',
							'message':'角色必须选择站点！'
						});
						return 0;
					}
					for(var j=0;j<len;j++){
						if(data['roleList'][i].id == data['roleList'][j].id && i!=j){
							notify.show({
								'type':'error',
								'message':'角色不能重复！'
							});
							return 0;
						}
					}
				}
				return data;
			}
			
			/**
			 * 初使化节点
			 */
			pro.__initNode = function() {
				this.__super();
			};
			/**
			 * 销毁控件
			 */
			pro.__destroy = function(event) {
				// this.tree&&this.tree._$recycle();
				this.__super();
			};
			return p._$$AddUserGroupWin;
		})
