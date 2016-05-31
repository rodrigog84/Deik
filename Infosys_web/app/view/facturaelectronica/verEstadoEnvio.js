Ext.define('Infosys_web.view.facturaelectronica.verEstadoEnvio' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.verestadoenvio',
    
    title : 'Estado Env&iacute;o',
    autoHeight: false,

    autoShow: true,
    width: 800,
    height: 225,
    initComponent: function() {
        me = this;
        var idfactura = me.idfactura;
        estado_envio_dte = "";
        estado_dte = "";

        response_datos = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/datos_dte_json/'+idfactura});
        var obj_datos = Ext.decode(response_datos.responseText);
        if(obj_datos.length == 0){
            var tipo_doc = "";
            var folio = "";
            var trackid = "N/A";
            var email_envio = "";

        }else{
            var tipo_doc = obj_datos.tipo_doc;
            var folio = obj_datos.folio;
            var trackid = obj_datos.trackid;
            var email_envio = obj_datos.e_mail;
        }


        response_estado = Ext.Ajax.request({
        async: false,
        waitMsg    :    'Processing your request',
        url: preurl + 'facturas/estado_dte/'+idfactura});
        var obj_estado = Ext.decode(response_estado.responseText);

        var estado_dte = obj_estado.error ? obj_estado.message : obj_estado.glosa_estado + " - " + obj_estado.glosa_err;      

        var disabled_envio = obj_estado.glosa_estado == 'DTE No Recibido' ? false : true;
        var disabled_mail = obj_estado.glosa_estado == 'DTE No Recibido' ? true : false;
        this.items = [
            {
                xtype: 'form',
                padding: '0 0 0 0',
                border: false,
                frame: false,
                style: 'background-color: #fff;',
                waitMsgTarget: true, 
                //icon: 'images/download-icon.png',  // Use a URL in the icon config
                viewConfig:{
                    loadingCls: 'images/download-icon.png'
                },                
                items: [
                    {
                        xtype: 'displayfield',
                        itemId : 'tipo_doc',
                        fieldLabel : 'Tipo Documento',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : tipo_doc,
                        labelWidth: 200,
                    
                    },   
                    {
                        xtype: 'displayfield',
                        itemId : 'folio',
                        fieldLabel : 'Folio',
                        labelStyle: ' font-weight:bold',
                        value : folio,
                        labelWidth: 200,
                    
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_dte',
                        fieldLabel : 'Estado del DTE:',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : estado_dte,
                        labelWidth: 200,
                    },   
                    {
                        xtype: 'textfield',
                        name: 'trackid',
                        itemId : 'trackid',
                        fieldLabel : 'Identificador de Env&iacute;o',
                        labelStyle: ' font-weight:bold',
                        value : trackid,
                        labelWidth: 200,
                        allowBlank : false           
                    },   
                    {
                        xtype: 'displayfield',
                        itemId : 'email',
                        fieldLabel : 'Email Env&iacute;o',
                        labelStyle: ' font-weight:bold',
                        value : email_envio,
                        labelWidth: 200,
                    
                    },
                    {
                        xtype: 'numberfield',
                        itemId : 'idfactura',
                        name : 'idfactura',
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : idfactura,
                        hidden: true
                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-upload',
                            text: 'Enviar a SII',
                            itemId : 'sent_button',
                            disabled : disabled_envio,                            
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/envio_sii',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {
                                            Ext.Msg.alert('Atención', o.result.message);
                                            me.down('#trackid').setValue(o.result.trackid);  

                                            var estado_dte = o.result.trackid != 0 ? "DTE Recibido - Revisi&oacute;n en proceso" : "DTE No Recibido.  Documento No Recibido por el SII";

                                            me.down('#estado_dte').setValue(estado_dte);

                                            if(o.result.trackid != 0){
                                                me.down('#sent_button').setDisabled(true);    
                                            }   


                                        },
                                        error: function(fp, o){
                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        },
                        {
                            iconCls: 'icon-save',
                            text: 'Actualizar Identificador Env&iacute;o',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/put_trackid',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);
                                            this.close;

                                        }
                                    });
                                }
                            }                            
                        },
                        {
                            iconCls: 'icon-email',
                            text: 'Env&iacute;o DTE email',
                            disabled : disabled_mail,  
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/envio_mail_dte',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);
                                            this.close;

                                        },
                                        error: function(fp, o){
                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        }                        ]
                    }
                ],
            }
        ];
        
        this.callParent(arguments);
    }
});
