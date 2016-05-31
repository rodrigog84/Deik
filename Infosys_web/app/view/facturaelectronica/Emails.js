Ext.define('Infosys_web.view.facturaelectronica.Emails' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.emails',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Registro Emails',
    autoHeight: true,

    autoShow: true,
    width: 700,
    height : 800,
    initComponent: function() {
        me = this;


     var tipoServer = Ext.create('Ext.data.Store', {
        fields: ['value', 'nombre'],
        data : [
            {"value":"smtp", "nombre":"smtp"},
            {"value":"imap", "nombre":"imap"}
        ]
    });


        response_email = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/get_email/'});
        var obj_email = Ext.decode(response_email.responseText);
        var email = obj_email.data ? obj_email.data : false;
        if(!email){
            var email_contacto = "";
            var pass_contacto = "";
            var tserver_contacto = "";
            var port_contacto = 0;
            var host_contacto = "";


            var email_intercambio = "";
            var pass_intercambio = "";
            var tserver_intercambio = "";
            var port_intercambio = 0;
            var host_intercambio = "";

        }else{
            var obj_email = Ext.decode(email);
            var email_contacto = obj_email.email_contacto;
            var pass_contacto = obj_email.pass_contacto;
            var tserver_contacto = obj_email.tserver_contacto;
            var port_contacto = obj_email.port_contacto;
            var host_contacto = obj_email.host_contacto;


            var email_intercambio = obj_email.email_intercambio;
            var pass_intercambio = obj_email.pass_intercambio;
            var tserver_intercambio = obj_email.tserver_intercambio;
            var port_intercambio = obj_email.port_intercambio;
            var host_intercambio = obj_email.host_intercambio;

        }


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
                                    fieldLabel : 'Email Contacto SII',
                                    labelStyle: ' font-weight:bold',
                                    value : "",
                                    width: 340,
                                    labelWidth: 200,
                        },
                        {
                            xtype: 'textfield',
                            name: 'email_contacto',
                            itemId : 'email_contacto',
                            fieldLabel : 'Email',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            inputType: 'email',
                            allowBlank : false,
                            value : email_contacto
                   
                        },{
                            xtype: 'textfield',
                            name: 'pass_contacto',
                            itemId : 'pass_contacto',
                            fieldLabel : 'Contrase&ntilde;a',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            inputType: 'password',
                            allowBlank : false,
                            value : pass_contacto
                   
                        },{
                            xtype: 'combobox',
                            store : tipoServer,
                            fieldLabel: 'Tipo Server',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipoServer_contacto' ,
                            name : 'tipoServer_contacto' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value',
                            value: tserver_contacto                         

                        },{
                            xtype: 'numberfield',
                            name: 'port_contacto',
                            itemId : 'port_contacto',
                            fieldLabel : 'Puerto',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            allowBlank : false,
                            value: port_contacto
                   
                        },{
                            xtype: 'textfield',
                            name: 'host_contacto',
                            itemId : 'host_contacto',
                            fieldLabel : 'Host',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            allowBlank : false,
                            value: host_contacto
                   
                        },{
                            xtype: 'button',
                            action: 'adddteprovee',
                            text : 'Probar Email Contacto',
                            handler: function(){

                                    response_email = Ext.Ajax.request({
                                    async: false,
                                    url: preurl + 'facturas/prueba_email/contacto'});
                                    //obj_email = Ext.decode(response_email.responseText);
                                    //Ext.Msg.alert('Atención', obj_email.message);
                                    Ext.Msg.alert('Atención', "Email enviado. Favor verificar casilla de correos");
                            }                            
                            },{
                                    xtype: 'displayfield',
                                    itemId : 'estado_certificado',
                                    fieldLabel : 'Email Intercambio',
                                    labelStyle: 'font-weight:bold',
                                    value : "",
                                    labelWidth: 200,
                        },{
                            xtype: 'textfield',
                            labelWidth: 150,
                            name: 'email_intercambio',
                            itemId : 'email_intercambio',
                            fieldLabel: 'Email',
                            labelStyle: ' font-weight:bold',
                            allowBlank : false,
                            value: email_intercambio
                   
                        },{
                            xtype: 'textfield',
                            labelWidth: 150,
                            name: 'pass_intercambio',
                            itemId : 'pass_intercambio',
                            fieldLabel: 'Contrase&ntilde;a',
                            labelStyle: ' font-weight:bold',
                            inputType: 'password',
                            value : pass_intercambio,
                            allowBlank : false
                   
                        },{
                            xtype: 'combobox',
                            store : tipoServer,
                            fieldLabel: 'Tipo Server',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipoServer_intercambio' ,
                            name : 'tipoServer_intercambio' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value',
                            value: tserver_intercambio                            

                        },{
                                xtype: 'numberfield',
                                fieldCls: 'required',
                                labelWidth: 150,
                                name: 'port_intercambio',
                                itemId: 'port_intercambio',
                                fieldLabel: 'Puerto',
                                labelStyle: ' font-weight:bold',
                                value : port_intercambio,
                                allowBlank : false
                        },
                        {
                        xtype: 'textfield',
                        labelWidth: 150,
                        name: 'host_intercambio',
                        itemId : 'host_intercambio',
                        fieldLabel: 'Host',
                        labelStyle: ' font-weight:bold',
                        value : host_intercambio,
                        allowBlank : false
               
                        },{
                            xtype: 'button',
                            action: 'adddteprovee',
                            text : 'Probar Email Intercambio',
                            handler: function(){

                                    response_email = Ext.Ajax.request({
                                    async: false,
                                    url: preurl + 'facturas/prueba_email/intercambio'});
                                    //obj_email = Ext.decode(response_email.responseText);
                                    //Ext.Msg.alert('Atención', obj_email.message);
                                    Ext.Msg.alert('Atención', "Email enviado. Favor verificar casilla de correos");
                            }
                            },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-save',
                            text: 'Guardar',
                            //disabled :  permite_carga ? false : true,
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/registro_email',
                                        waitMsg: 'Guardando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);

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
