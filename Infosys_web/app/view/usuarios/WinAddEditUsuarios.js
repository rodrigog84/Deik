 Ext.define('Infosys_web.view.usuarios.WinAddEditUsuarios', {
    extend: 'Ext.window.Window',
    xtype: 'wusuariosaddedit',
    id: 'wusuariosaddedit_id',
    iconCls: 'addd',
    width: 740,
    modal: true,
    layout: 'fit',
    title: 'Editar/Crear Usuario',
    items: [{
        xtype: 'form',
        border: false,
        bodyPadding: 12,
        frame: true,
        items: [
            {
                xtype: 'textfield',
                name : 'id',
                hidden: true,
                itemId: 'id'
            },
			{
	            xtype: 'fieldcontainer',
	            layout: 'hbox',
	            defaults: {labelWidth: 120, allowBlank: false, msgTarget: 'side', width: 310},
	            items: [
					{
						xtype: 'textfield',
						fieldLabel: 'Nombre',
                        itemId: 'nombreid',	
						name: 'nombre'
					},{xtype: 'displayfield',width: 40},
					{
						xtype: 'textfield',
						fieldLabel: 'Apellido',		
                        itemId: 'apellidoid', 		
						name: 'apellido'
					}
				]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {labelWidth: 120, allowBlank: false, msgTarget: 'side', width: 310},
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre Usuario',   
                        itemId: 'usernameid', 
                        name: 'username'
                    },{xtype: 'displayfield',width: 40},
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Contraseña',   
                        inputType: 'password', 
                        itemId: 'passwordid',           
                        name: 'password'
                    }
                ]
            },{
                xtype: 'grid',
                title: 'Roles Asignados',
                store: Ext.create('Ext.data.Store', {
                    storeId:'rolesStore',
                    fields: [
                        {name: 'id'},{name: 'nombre'},{name: 'existe'}
                    ],
                    autoLoad: false,
                    proxy: {
                        type: 'ajax',
                        api: {
                            read: '/Deik/core/index.php/usuarios/getAllRoles'
                        },
                        reader: {
                            type: 'json',
                            root: 'data',
                            successProperty: 'success'
                        }
                    }
                }),
                viewConfig: {           
                    getRowClass: function(record){
                        return record.get('existe') ? 'grid_many_active' : '';
                    }
                },
                columns: [
                    { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
                    { xtype: 'checkcolumn', text: 'Habilitar', dataIndex: 'existe' }
                ],
                height: 300
            }
    	]
    }],
    fbar: [
    	{
    		text: 'Cancelar',
            iconCls: 'cancelw',
            scale: 'medium',
    		handler: function(){
    			Ext.getCmp('wusuariosaddedit_id').close();

    		}
    	},
        {
            text: 'Grabar',
            iconCls: 'savew',
            scale: 'medium',
            handler: function(){
            	var win = this.up('wusuariosaddedit');
                var form   = win.down('form')
                var sform   = form.getForm()
                var nuevo = false;
                var record = form.getRecord();
                var values = form.getValues();


                if(!sform.isValid()){
                    Ext.Msg.alert("Informacion", "Ingrese los campos obligatorios");
                    return false;
                }    

                var grid = win.down("grid")
                var st = grid.getStore();
                var records = [];
                st.each(function(r){
                    if(r.data.existe){
                        records.push(r.data)
                    }
                });

                if (values.id > 0){
                    sform.submit({
                        url: '/Deik/core/index.php/usuarios/update',
                        waitMsg: 'Grabando...',
                        params: {
                            roles: Ext.JSON.encode(records)
                        },
                        success: function(fp, o) {
                            Ext.getCmp('adminusuarios').down('grid').getStore().loadData([],false);
                            Ext.getCmp('adminusuarios').down('grid').getStore().load()
                            Ext.getCmp('wusuariosaddedit_id').close();
                        },
                        failure: function() {
                            Ext.Msg.alert("Error", "Error");
                        }
                    });
                } else{
                    sform.submit({
                        url: '/Deik/core/index.php/usuarios/save',
                        waitMsg: 'Grabando...',
                        params: {
                            roles: Ext.JSON.encode(records)
                        },
                        success: function(fp, o) {
                            
                            Ext.getCmp('adminusuarios').down('grid').getStore().load()
                            Ext.getCmp('wusuariosaddedit_id').close();
                        },
                        failure: function() {
                            Ext.Msg.alert("Error", "Error");
                        }
                    });
                }

            }
        }
    ]
});