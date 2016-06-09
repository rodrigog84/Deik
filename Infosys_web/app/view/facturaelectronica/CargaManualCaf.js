Ext.define('Infosys_web.view.facturaelectronica.CargaManualCaf' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.cargamanualcaf',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Carga CAF',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,
    initComponent: function() {
        me = this;
        var estado_carga = "";
         var tipoCaf = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":33, "nombre":"(33) Factura Electronica"},
                {"value":34, "nombre":"(34) Factura No Afecta Electronica"},
                {"value":52, "nombre":"(52) Guía de Despacho Electronica"},
                {"value":56, "nombre":"(56) Nota de Débito Electronica"},
                {"value":61, "nombre":"(61) Nota de Crédito Electronica"}
            ]
        });


        permite_carga = false;
        response_rut = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/existe_empresa/'});

        var obj_rut = Ext.decode(response_rut.responseText);
        var permite_carga = obj_rut.existe ? true : false;
        var message_carga = obj_rut.existe ? "" : "&nbsp;&nbsp;Pendiente Ingreso de datos de Empresa&nbsp;&nbsp;";



        if(permite_carga){
            response = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/existe_certificado/'});

            var obj = Ext.decode(response.responseText);
            var permite_carga = obj.existe ? true : false;
            var message_carga = obj.existe ? "" : "&nbsp;&nbsp;Pendiente Carga certificado digital&nbsp;&nbsp;";
        }

        var message_si = " folios disponibles <img src='" + preurl_js + "resources/images/aceptar.png' >";
        var message_no = "No existen folios disponibles <img src='" + preurl_js + "resources/images/cancel.png' >";

        response_33 = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/estado_tipo_documento/33'});
        var obj_33 = Ext.decode(response_33.responseText);
        var message_33 = obj_33.cantidad > 0 ? obj_33.cantidad + message_si : message_no;

        response_34 = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/estado_tipo_documento/34'});
        var obj_34 = Ext.decode(response_34.responseText);
        var message_34 = obj_34.cantidad > 0 ? obj_34.cantidad + message_si : message_no;

        response_52 = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/estado_tipo_documento/52'});
        var obj_52 = Ext.decode(response_52.responseText);
        var message_52 = obj_52.cantidad > 0 ? obj_52.cantidad + message_si : message_no;

        response_56 = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/estado_tipo_documento/56'});
        var obj_56 = Ext.decode(response_56.responseText);
        var message_56 = obj_56.cantidad > 0 ? obj_56.cantidad + message_si : message_no;

        response_61 = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/estado_tipo_documento/61'});
        var obj_61 = Ext.decode(response_61.responseText);
        var message_61 = obj_61.cantidad > 0 ? obj_61.cantidad + message_si : message_no;


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
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        fieldStyle: 'font-weight:bold;background-color:red;',
                        value : message_carga,
                        labelWidth: 200,
                        hidden : permite_carga
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_33',
                        fieldLabel : 'Facturas Electrónicas',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : message_33,
                        labelWidth: 200,
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_34',
                        fieldLabel : 'Factura No Afecta Electronica',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : message_34,
                        labelWidth: 200,
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_52',
                        fieldLabel : 'Guía de Despacho Electronica',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : message_52,
                        labelWidth: 200,
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_56',
                        fieldLabel : 'Nota de Débito Electronica',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : message_56,
                        labelWidth: 200,
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_61',
                        fieldLabel : 'Nota de Crédito Electronica',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : message_61,
                        labelWidth: 200,
                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : tipoCaf,
                            fieldLabel: 'Tipo CAF',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipoCaf' ,
                            name : 'tipoCaf' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value'                            

                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 200,
                        items: [{
                            xtype: 'filefield',
                            id: 'form-file',
                            width: 500,
                            emptyText: 'CAF .xml',
                            fieldLabel: 'CAF',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            name: 'caf',
                            allowBlank : false,
                            buttonText: 'Examinar',
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.xml' // or w/e type
                                  });
                                }
                            }              
                        }]
                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-upload',
                            text: 'Enviar',
                            text: 'Cargar',
                            disabled :  permite_carga ? false : true,
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/cargacaf',
                                        waitMsg: 'Cargando CAF...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);

                                            response_33 = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/estado_tipo_documento/33'});
                                            var obj_33 = Ext.decode(response_33.responseText);
                                            var message_33 = obj_33.cantidad > 0 ? obj_33.cantidad + message_si : message_no;

                                            response_34 = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/estado_tipo_documento/34'});
                                            var obj_34 = Ext.decode(response_34.responseText);
                                            var message_34 = obj_34.cantidad > 0 ? obj_34.cantidad + message_si : message_no;


                                            response_52 = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/estado_tipo_documento/52'});
                                            var obj_52 = Ext.decode(response_52.responseText);
                                            var message_52 = obj_52.cantidad > 0 ? obj_52.cantidad + message_si : message_no;



                                            response_56 = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/estado_tipo_documento/56'});
                                            var obj_56 = Ext.decode(response_56.responseText);
                                            var message_56 = obj_56.cantidad > 0 ? obj_56.cantidad + message_si : message_no;

                                            response_61 = Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/estado_tipo_documento/61'});
                                            var obj_61 = Ext.decode(response_61.responseText);
                                            var message_61 = obj_61.cantidad > 0 ? obj_61.cantidad + message_si : message_no;

                                            me.down('#estado_33').setValue(message_33);
                                            me.down('#estado_34').setValue(message_34);
                                            me.down('#estado_52').setValue(message_52);
                                            me.down('#estado_56').setValue(message_56);
                                            me.down('#estado_61').setValue(message_61);

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
