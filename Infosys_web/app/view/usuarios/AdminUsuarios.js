Ext.define('Infosys_web.view.usuarios.AdminUsuarios', {
    extend: 'Ext.panel.Panel',
    xtype: 'adminusuarios',
    id: 'adminusuarios',
    frame: true,
    layout: 'fit',
    title: 'Administrar Usuarios',
    initComponent: function(){
    	var me = this;

        var st = Ext.create('Ext.data.Store', {
            storeId:'userStore',
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'apellido'},
                {name: 'username'},
                {name: 'password'},
                {name: 'reg_estado'}
            ],
            autoLoad: true,
            pageSize: 15,
            listeners: {
            	load: function(r, s){
            		if(s.length<=0){
                    	Ext.MessageBox.show({
				           title:'Informacion',
				           msg: 'No se encontraron registros',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       	});      
            		}
            	}
            },
            
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Deik/core/index.php/usuarios/getAll'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    successProperty: 'success'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,
                    encode: true,
                    root: 'data'
                }
            }
        });

        var grid=Ext.create('Ext.grid.Panel', {
            tbar:[
            {
                text        : 'Editar',
                iconCls     : 'editt',
                itemId: 'p_editar_id',
                handler     : function () {
					me.editar();   
                }
            },'-',
            {
                text        : 'Agregar',
                iconCls     : 'addd',
                itemId: 'p_agregar_id',
                handler     : function () {
                    var win = Ext.create('Infosys_web.view.usuarios.WinAddEditUsuarios', { iconCls: 'addd', title: 'Agregar Nuevo'
                    }).show()
                    win.down('grid').getStore().load({params: {usuario_id: 0}});

                }
            },'-',

			{
			  xtype: 'combobox',
			  store: Ext.create('Ext.data.Store', {
	            fields: [
	                {name: 'id'},
	                {name: 'apellido'}
	            ],
	            autoLoad: true,
	            proxy: {
	                type: 'ajax',
	                api: {
	                    read: '/Deik/core/index.php/usuarios/getAllWithNotFilter'
	                },
	                reader: {
	                    type: 'json',
	                    root: 'data',
	                    successProperty: 'success'
	                }
	            }
	        }),
			  displayField: 'apellido',
			  valueField: 'id',
			  queryMode: 'local',
			  editable: true,
			  fieldLabel: '&nbsp;&nbsp; <b>Apellido</b>',
			  labelWidth: 90,
			  hideTrigger:true,
			  maxHeight: 22,
			  itemId: 'nombreid'
			},
            {
                text        : 'Buscar',
                iconCls     : 'icon-search',
                handler     : function () {
                    var w_gnrl = me
                    var value = w_gnrl.down('#nombreid').getRawValue()
                    w_gnrl.down('grid').getStore().load({params: {nombre: value}})
                }
            },'-',
            {
                text        : 'Limpiar filtros',
                iconCls     : 'icon-reload',
                handler     : function () {
                    var w_gnrl = me
                    w_gnrl.down('#nombreid').setValue("")
                    w_gnrl.down('grid').getStore().load({params: {nombre: ""}})
                }
            },'->',
            {
                text        : 'Habilitar',
                iconCls     : 'enabled',
                itemId: 'p_habilitar_id',
                handler     : function () {
                    var w_gnrl = me;

                    var grid  = w_gnrl.down('grid');
                    if (grid.getSelectionModel().hasSelection()) {
                        var row = grid.getSelectionModel().getSelection()[0];
                        Ext.Ajax.request({
                            url: '/Deik/core/index.php/usuarios/enabled',
                            waitMsg: 'Actualizando...',
                            params: {
                                id: row.data.id
                            },
                            success: function(fp, o) {
                                grid.getStore().load()
                            },
                            failure: function() {
                                Ext.Msg.alert("Error", "Error");
                            }
                        });
                    }else{
                    	Ext.MessageBox.show({
				           title:'Informacion',
				           msg: 'Seleccione un Registro',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.INFO
				       	});                    
                    }

                }
            },'-',
            {
                text        : 'Deshabilitar',
                iconCls     : 'disabled',
                itemId: 'p_eliminar_id',
                handler     : function () {
                    var w_gnrl = me;
                    var grid  = w_gnrl.down('grid');
                    if (grid.getSelectionModel().hasSelection()) {
                        var row = grid.getSelectionModel().getSelection()[0];
                        Ext.Ajax.request({
                            url: '/Deik/core/index.php/usuarios/delete',
                            waitMsg: 'Actualizando...',
                            params: {
                                id: row.data.id
                            },
                            success: function(fp, o) {
                                grid.getStore().load()
                            },
                            failure: function() {
                                Ext.Msg.alert("Error", "Error");
                            }
                        });
                    }else{
                    	Ext.MessageBox.show({
				           title:'Informacion',
				           msg: 'Seleccione un Registro',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.INFO
				       	});
                    }
                }
            },'-', {
                text        : 'Cerrar',
                iconCls     : 'disabled',
                //itemId: 'p_eliminar_id',
                handler     : function () {
                    me.cerrar(); 
                }
            }],
            listeners: {
                select: function() {
                    this.getView().refresh();
                },
                itemdblclick: function(dv, record, item, index, e) {
			     	me.editar();   
			    }
            },
            viewConfig: {		    
				getRowClass: function(record){
					return record.get('reg_estado') == 1 ? 'grid_enabled' : 'grid_disabled';
				}
		    },
            store: Ext.data.StoreManager.lookup('userStore'),
            columns: [
            	{xtype: 'rownumberer', width: 30, text: ""},
                { text: 'Usuario',  dataIndex: 'username', width: 190},
                { text: 'Nombre',  dataIndex: 'nombre', flex: 1},
                { text: 'Apellido',  dataIndex: 'apellido', flex: 1, renderer: function(v){return "<b>"+v+"</b>"}},
                { text: 'Estado',  dataIndex: 'reg_estado', width: 70, renderer: function(v){return v==1 ? "<font style='color:green'>Activo</font>": "<font style='color:red'>Inactivo</font>"}}
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: Ext.data.StoreManager.lookup('userStore'),   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }]
        });
		me.items = [grid];

		me.callParent();
    },

    cerrar: function(){
          var viewport = Ext.getCmp('panelprincipal_id');
          viewport.removeAll();
    },

    editar: function(){
	    var win;
	    var w_gnrl = this;
	    var grid  = w_gnrl.down('grid');

	    if (grid.getSelectionModel().hasSelection()) {

	        var row = grid.getSelectionModel().getSelection()[0];

            win = Ext.create('Infosys_web.view.usuarios.WinAddEditUsuarios', { 
                iconCls: 'editt', 
                title: 'Editar Registro'
            });
            win.show();
            win.down('#id').setValue(row.data.id);
			win.down('#nombreid').setValue(row.data.nombre);
			win.down('#apellidoid').setValue(row.data.apellido);
            win.down('#usernameid').setValue(row.data.username);
            win.down('#passwordid').setValue(row.data.password);

            win.down('grid').getStore().load({params: {usuario_id: row.data.id}});
            
	    }else{
	   		Ext.MessageBox.show({
	           title:'Informacion',
	           msg: 'Seleccione un Registro',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.INFO
	       	});                    
	   	}
    }
});