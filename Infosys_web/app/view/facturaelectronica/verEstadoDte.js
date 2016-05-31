Ext.define('Infosys_web.view.facturaelectronica.verEstadoDte' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.verestadodte',
    
    title : 'Estado DTE',
    autoHeight: false,

    autoShow: true,
    width: 800,
    height: 200,
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
            var trackid = "";

        }else{
            var tipo_doc = obj_datos.tipo_doc;
            var folio = obj_datos.folio;
            var trackid = obj_datos.trackid;

        }


        if(trackid == ""){
            var estado_envio_dte = "N/A";

        }else if(trackid == "0"){
            var estado_envio_dte = "No Enviado";
        }else{
            response_envio = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/estado_envio_dte/'+idfactura});
            var obj_envio = Ext.decode(response_envio.responseText);
            var cod_envio = obj_envio.codigo == -11 ? 'Error' : obj_envio.codigo
            var estado_envio_dte = obj_envio.error ? obj_envio.message : cod_envio + " - " + obj_envio.glosa;
        }


        /*if(trackid == ""){
            var estado_dte = "N/A";
        }else if(trackid == "0"){
            var estado_dte = "No Enviado";
        }else{*/
            response_estado = Ext.Ajax.request({
            async: false,
            waitMsg    :    'Processing your request',
            url: preurl + 'facturas/estado_dte/'+idfactura});
            var obj_estado = Ext.decode(response_estado.responseText);
            var estado_dte = obj_estado.error ? obj_estado.message : obj_estado.glosa_estado + " - " + obj_estado.glosa_err;      
        //}

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
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
                    
                    },   
                    {
                        xtype: 'displayfield',
                        itemId : 'trackid',
                        fieldLabel : 'Identificador de Env&iacute;o',
                        labelStyle: ' font-weight:bold',
                        value : trackid,
                        labelWidth: 200,
                    
                    },                                                    
                   {
                        xtype: 'displayfield',
                        itemId : 'estado_envio',
                        fieldLabel : 'Estado del Env&iacute;o:',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : estado_envio_dte,
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
                        xtype: 'numberfield',
                        itemId : 'idfactura',
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : idfactura,
                        hidden: true
                    }
                ],
                /*listeners:{
                    afterlayout: function(form, layout, eOpts){
                        form.getForm().load({waitMsg:'Cargando'});                          
                        me = this;
                       // console.log(me.down('#idfactura').getValue());
                        
                        var idfactura = me.down('#idfactura').getValue();
                        response_envio = Ext.Ajax.request({
                        async: false,
                        url: preurl + 'facturas/estado_envio_dte/'+idfactura});
                        var obj_envio = Ext.decode(response_envio.responseText);
                        var estado_envio_dte = obj_envio.error ? obj_envio.message : obj_envio.codigo + " - " + obj_envio.glosa;

                        //me.down('#estado_envio').setValue(estado_envio_dte); 
                        
                    }
                }*/
            }
        ];
        
        this.callParent(arguments);
    }
});
