 Ext.define('Infosys_web.view.roles.WinAddEditRoles', {
    extend: 'Ext.window.Window',
    xtype: 'wrolesaddedit',
    id: 'wrolesaddedit_id',
    iconCls: 'addd',
    width: 790,
    modal: true,
    layout: 'fit',
    title: 'Editar/Crear Rol',
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
	            defaults: {labelWidth: 120, allowBlank: false, msgTarget: 'side', width: 350},
	            items: [
					{
						xtype: 'textfield',
						fieldLabel: 'Nombre',		
						name: 'nombre',
						itemId: 'nombreid'
					},{xtype: 'displayfield',width: 40},
					{
						xtype: 'textfield',
						fieldLabel: 'Descripción',				
						name: 'descripcion',
						itemId: 'descripcionid'
					}
				]
            },{
                xtype: 'grid',
                title: 'Accesos',
                store: Ext.create('Ext.data.Store', {
                    storeId:'accesosStore',
                    fields: [
                        {name: 'id'},{name: 'descripcion'},{name: 'existe'}
                    ],
                    autoLoad: false,
                    proxy: {
                        type: 'ajax',
                        api: {
                            read: preurl + 'roles/getAllAccesos'
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
                    { text: 'Acceso Descripcion', dataIndex: 'descripcion', flex: 1 },
                    { xtype: 'checkcolumn', text: 'Habilitar', dataIndex: 'existe' }
                ],
                height: 350
            }
    	]
    }],
    fbar: [
    	{
    		text: 'Cancelar',
            iconCls: 'cancelw',
            scale: 'medium',
    		handler: function(){
    			Ext.getCmp('wrolesaddedit_id').close();

    		}
    	},
        {
            text: 'Grabar',
            iconCls: 'savew',
            scale: 'medium',
            handler: function(){
            	var win = this.up('wrolesaddedit');
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
                    records.push(r.data)
                });

                if (values.id > 0){
                    sform.submit({
                        url: preurl + 'roles/update',
                        waitMsg: 'Grabando...',
                        params: {
                            accesos: Ext.JSON.encode(records)
                        },
                        success: function(fp, o) {
                            Ext.getCmp('adminroles').down('grid').getStore().loadData([],false);
                            Ext.getCmp('adminroles').down('grid').getStore().load()
                            Ext.getCmp('wrolesaddedit_id').close();
                        },
                        failure: function() {
                            Ext.Msg.alert("Error", "Error");
                        }
                    });
                } else{
                    sform.submit({
                        url: preurl + 'roles/save',
                        waitMsg: 'Grabando...',
                        params: {
                            accesos: Ext.JSON.encode(records)
                        },
                        success: function(fp, o) {
                            Ext.getCmp('adminroles').down('grid').getStore().loadData([],false);
                            Ext.getCmp('adminroles').down('grid').getStore().load()
                            Ext.getCmp('wrolesaddedit_id').close();
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