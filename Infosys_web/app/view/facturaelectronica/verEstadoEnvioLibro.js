Ext.define('Infosys_web.view.facturaelectronica.verEstadoEnvioLibro' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.verestadoenviolibro',
    
    title : 'Estado Env&iacute;o Libro',
    autoHeight: false,

    autoShow: true,
    width: 800,
    height: 200,
    initComponent: function() {
        me = this;
        var idlibro = me.idlibro;
        estado_envio_dte = "";
        estado_dte = "";
        
        response_datos = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/datos_libro_json/'+idlibro});

        var obj_datos = Ext.decode(response_datos.responseText);
        console.log(obj_datos);
        if(obj_datos.length == 0){
            var tipo_libro = "";
            var periodo = "";
            var trackid = "N/A";
        }else{
            var tipo_libro = obj_datos.tipo_libro;
            var periodo = obj_datos.mes + " " + obj_datos.anno;
            var trackid = obj_datos.trackid;
        }


        if(trackid == ""){
            var estado_envio_dte = "N/A";

        }else if(trackid == "0"){
            var estado_envio_dte = "No Enviado";
        }else{
            response_envio = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/estado_envio_libro/'+idlibro});
            var obj_envio = Ext.decode(response_envio.responseText);
            var cod_envio = obj_envio.codigo == -11 ? 'Error' : obj_envio.codigo
            var estado_envio_dte = obj_envio.error ? obj_envio.message : cod_envio + " - " + obj_envio.glosa;
        }


        /*response_estado = Ext.Ajax.request({
        async: false,
        waitMsg    :    'Procesando',
        url: preurl + 'facturas/estado_dte/'+idlibro});
        var obj_estado = Ext.decode(response_estado.responseText);

        var estado_dte = obj_estado.error ? obj_estado.message : obj_estado.glosa_estado + " - " + obj_estado.glosa_err;  */    

        var disabled_envio = estado_envio_dte == 'No Enviado' || estado_envio_dte == 'N/A' ? false : true;
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
                        itemId : 'tipo_libro',
                        fieldLabel : 'Tipo Libro',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : tipo_libro,
                        labelWidth: 200,
                    
                    },   
                    {
                        xtype: 'displayfield',
                        itemId : 'periodo',
                        fieldLabel : 'Per&iacute;odo',
                        labelStyle: ' font-weight:bold',
                        value : periodo,
                        labelWidth: 200,
                    
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_dte',
                        fieldLabel : 'Estado del DTE:',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : estado_envio_dte,
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
                        xtype: 'numberfield',
                        itemId : 'idlibro',
                        name : 'idlibro',
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : idlibro,
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
                                        url: preurl + 'facturas/envio_libro_sii',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {
                                            Ext.Msg.alert('Atención', o.result.message);
                                            me.down('#trackid').setValue(o.result.trackid);  

                                            var estado_dte = o.result.trackid != 0 ? "Libro Recibido - Revisi&oacute;n en proceso" : "Libro No Recibido.  Documento No Recibido por el SII";

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
                                        url: preurl + 'facturas/put_trackid_libro',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);
                                            this.close;

                                        }
                                    });
                                }
                            }                            
                        }]
                    }
                ],
            }
        ];
        
        this.callParent(arguments);
    }
});
