 Ext.define('Infosys_web.view.vendedores.CambioPassword', {
    extend: 'Ext.window.Window',
    alias: 'widget.cambiopassword',
    xtype: 'wmisdatos',
    id: 'wmisdatos_id',
    iconCls: 'micuenta',
    width: 540,
    modal: true,
    layout: 'fit',
    title: 'Mi Password',
    items: [{
        xtype: 'form',
        border: false,
        bodyPadding: 12,
        frame: true,
        defaults: {labelWidth: 190, allowBlank: false, msgTarget: 'side', width: 420},
        items: [
			{
                xtype: 'textfield',
                fieldLabel: 'Id',
                inputType: 'id',
                itemId: 'Idid',             
                name: 'id',
                hidden: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Antigua Contraseña',
                inputType: 'password',
                itemId: 'oldpass',            
                name: 'oldpass'
            },{
                xtype: 'textfield',
                fieldLabel: 'Nueva Contraseña',  
                inputType: 'password',
                itemId: 'newpass',              
                name: 'newpass'
            },{
                xtype: 'textfield',
                fieldLabel: 'Repite Nueva Contraseña',    
                inputType: 'password',
                itemId: 'newpass2',            
                name: 'newpass2'
            }
    	]
    }],
    fbar: [
    	{
    		text: 'Cancelar',
            iconCls: 'cancelw',
            scale: 'medium',
    		handler: function(){
    			Ext.getCmp('wmisdatos_id').close();
    		}
    	},
        {
            text: 'Grabar',
            iconCls: 'savew',
            scale: 'medium',
            action: 'grabaclave'
        }
    ]
});