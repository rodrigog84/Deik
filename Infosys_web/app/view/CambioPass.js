 Ext.define('Infosys_web.view.CambioPass', {
    extend: 'Ext.window.Window',
    xtype: 'wmisdatos',
    id: 'wmisdatos_id',
    iconCls: 'micuenta',
    width: 540,
    modal: true,
    layout: 'fit',
    title: 'Mi Cuenta',
    items: [{
        xtype: 'form',
        border: false,
        bodyPadding: 12,
        frame: true,
        defaults: {labelWidth: 190, allowBlank: false, msgTarget: 'side', width: 420},
        items: [
			{
                xtype: 'textfield',
                fieldLabel: 'Antigua Contraseña',
                inputType: 'password',             
                name: 'oldpass'
            },{
                xtype: 'textfield',
                fieldLabel: 'Nueva Contraseña',  
                inputType: 'password',               
                name: 'newpass'
            },{
                xtype: 'textfield',
                fieldLabel: 'Repite Nueva Contraseña',    
                inputType: 'password',             
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
            handler: function(){
            	var win = this.up('wmisdatos');
                var form   = win.down('form')
                var sform   = form.getForm()
                var nuevo = false;
                var record = form.getRecord();
                var values = form.getValues();

                if(!sform.isValid()){
                    Ext.Msg.alert("Informacion", "Ingrese los campos obligatorios");
                    return false;
                }    

                sform.submit({
                    url:  '/Deik/core/index.php/login/changePass',
                    waitMsg: 'Grabando...',
                    success: function(fp, o) {
                        var objs = Ext.JSON.decode(o.response.responseText);
                        
                        if(objs.success == true){
                            Ext.MessageBox.show({
                               title:'Informacion',
                               msg: 'Grabado exitosamente',
                               buttons: Ext.MessageBox.OK,
                               icon: Ext.MessageBox.INFO
                            }); 
                            Ext.getCmp('wmisdatos_id').close();
                        }else{
                            Ext.MessageBox.show({
                               title:'Error',
                               msg: 'Verifica la informacion entregada',
                               buttons: Ext.MessageBox.OK,
                               icon: Ext.MessageBox.WARNING
                            }); 
                        }
                    },
                    failure: function() {
                       Ext.MessageBox.show({
                           title:'Error',
                           msg: 'Verifica la informacion entregada',
                           buttons: Ext.MessageBox.OK,
                           icon: Ext.MessageBox.WARNING
                        });                     
                   }
                });
            }
        }
    ]
});