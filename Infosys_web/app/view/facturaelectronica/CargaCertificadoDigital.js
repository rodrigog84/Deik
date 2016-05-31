Ext.define('Infosys_web.view.facturaelectronica.CargaCertificadoDigital' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.cargacertificadodigital',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Carga Certificado Digital',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,
    initComponent: function() {
        me = this;
        existe_certificado = "";
        response = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/existe_certificado/'});
        var obj = Ext.decode(response.responseText);
        var existe_certificado = obj.existe ? "Ya Cargado. Subir uno nuevo reemplazará el existente" : "No Cargado";
        /*success: function(response, opts) {
           var obj = Ext.decode(response.responseText);
           var existe_certificado = obj.existe ? "Ya Cargado. Subir uno nuevo reemplazará el existente" : "No Cargado";
           //me.down('#estado_certificado');
           console.log(me.down);
        },
        failure: function(response, opts) {
          console.log('server-side failure with status code ' + response.status);
        }
        })*/

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: true,
                style: 'background-color: #fff;',
                items: [
                   {
                        xtype: 'displayfield',
                        itemId : 'estado_certificado',
                        fieldLabel : 'Estado Certificado:',
                        labelStyle: ' font-weight:bold',
                        fieldStyle: 'font-weight:bold',
                        value : existe_certificado,
                        labelWidth: 200,
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 200,
                        items: [{
                            xtype: 'filefield',
                            id: 'form-file',
                            width: 500,
                            emptyText: 'Certificado .p12',
                            fieldLabel: 'Certificado Digital',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            name: 'certificado',
                            allowBlank : false,
                            buttonText: 'Examinar',
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.p12' // or w/e type
                                  });
                                }
                            }              
                        }]
                    },{
                            xtype: 'textfield',
                            width: 500,
                            emptyText: 'Password',
                            fieldLabel: 'Password',
                            labelStyle: ' font-weight:bold',
                            itemId : 'cert_password',
                            labelWidth: 200,
                            name: 'password',
                            inputType: 'password',
                            allowBlank : false

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-upload',
                            text: 'Enviar',
                            text: 'Cargar',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/cargacertificado',
                                        waitMsg: 'Cargando Certificado...',
                                        success: function(fp, o) {
                                            response = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/existe_certificado/'});
                                            var obj = Ext.decode(response.responseText);
                                            var existe_certificado = obj.existe ? "Cargado. Si desea cargar uno nuevo, se reemplazará el existente" : "No Cargado";
                                            me.down('#estado_certificado').setValue(existe_certificado);
                                            me.down('#cert_password').setValue('');
                                            Ext.Msg.alert('Exito', 'El certificado ha sido cargado.');

                                        }
                                    });
                                }
                            }                            
                        }]
                    }
                ]
            }
        ];
        
        this.callParent(arguments);
    }
});
