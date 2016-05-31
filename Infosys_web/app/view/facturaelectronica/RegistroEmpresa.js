Ext.define('Infosys_web.view.facturaelectronica.RegistroEmpresa' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.registroempresa',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Registro Empresa',
    autoHeight: true,

    autoShow: true,
    width: 700,
    height : 800,
    initComponent: function() {
        me = this;

        response_rut = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/existe_empresa/'});
        var obj_rut = Ext.decode(response_rut.responseText);
        var existe_empresa = obj_rut.existe ? true : false;

        if(existe_empresa){

            response_empresa = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/get_empresa_json/'});
            var obj_empresa = Ext.decode(response_empresa.responseText);
            console.log(obj_empresa);

            var rut = obj_empresa.rut+"-"+obj_empresa.dv;
            var razon_social = obj_empresa.razon_social;
            var giro = obj_empresa.giro;
            var cod_actividad = obj_empresa.cod_actividad;
            var direccion = obj_empresa.dir_origen;
            var comuna = obj_empresa.comuna_origen;
            var fec_resolucion = obj_empresa.fec_resolucion;
            var nro_resolucion = obj_empresa.nro_resolucion;
            var logo = gbl_site + 'core/facturacion_electronica/images/' + obj_empresa.logo;

        }else{
            var rut = "";
            var razon_social = "";
            var giro = "";
            var cod_actividad = 0;
            var direccion = "";
            var comuna = "";
            var fec_resolucion = "";
            var nro_resolucion = 0;
            var logo = gbl_site + 'core/facturacion_electronica/images/sinimagen.jpg';

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
                        itemId : 'estado_certificado',
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        fieldStyle: 'font-weight:bold;background-color:red;',
                        value : "",
                        labelWidth: 200,
                        hidden : true
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        labelWidth: 1500,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [ 
                            {
                            xtype: 'textfield',
                            name: 'rut',
                            itemId : 'rut',
                            fieldLabel : 'Rut',
                            labelStyle: ' font-weight:bold',
                            value : rut,
                            labelWidth: 150,
                            allowBlank : false
                   
                            },{
                                xtype: 'textfield',
                                fieldCls: 'required',
                                width: 400,
                                labelWidth: 150,
                                name: 'razon_social',
                                itemId: 'razon_social',
                                fieldLabel: '&nbsp;&nbsp;Raz&oacute;n Social',
                                labelStyle: ' font-weight:bold',
                                value : razon_social,
                                allowBlank : false
                           }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [ 
                            {
                            xtype: 'numberfield',
                            name: 'cod_actividad',
                            itemId : 'cod_actividad',
                            fieldLabel : 'C&oacute;digo Actividad',
                            labelStyle: ' font-weight:bold',
                            value : cod_actividad,
                            labelWidth: 150,
                            allowBlank : false
                   
                            },                        
                            {
                            xtype: 'textfield',
                            width: 400,
                            labelWidth: 150,
                            name: 'giro',
                            itemId : 'giro',
                            fieldLabel : '&nbsp;&nbsp;Giro',
                            labelStyle: ' font-weight:bold',
                            value : giro,
                            allowBlank : false
                   
                            }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [ 
                            {
                            xtype: 'textfield',
                            name: 'direccion',
                            itemId : 'direccion',
                            fieldLabel : 'Direcci&oacute;n',
                            labelStyle: ' font-weight:bold',
                            value : direccion,
                            labelWidth: 150,
                            allowBlank : false
                   
                            },                        
                            {
                            xtype: 'textfield',
                            width: 400,
                            labelWidth: 150,
                            name: 'comuna',
                            itemId : 'comuna',
                            fieldLabel : '&nbsp;&nbsp;Comuna',
                            labelStyle: ' font-weight:bold',
                            value : comuna,
                            allowBlank : false
                   
                            }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [ 
                            {
                            xtype: 'datefield',
                            name: 'fec_resolucion',
                            itemId : 'fec_resolucion',
                            fieldLabel : 'Fecha Resoluci&oacute;n',
                            labelStyle: ' font-weight:bold',
                            value : fec_resolucion,
                            labelWidth: 150,
                            allowBlank : false
                   
                            },                        
                            {
                            xtype: 'numberfield',
                            width: 400,
                            labelWidth: 150,
                            name: 'nro_resolucion',
                            itemId : 'nro_resolucion',
                            fieldLabel : '&nbsp;&nbsp;Nro. Resoluci&oacute;n',
                            labelStyle: ' font-weight:bold',
                            value : nro_resolucion,
                            allowBlank : false
                   
                            }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [ 
                            {
                            xtype: 'filefield',
                            id: 'logo',
                            emptyText: 'Logo .png',
                            fieldLabel: 'Logo',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 150,
                            name: 'logo',
                            allowBlank : true,
                            buttonText: 'Examinar',
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.png' // or w/e type
                                  });
                                }
                            }              
                        },

                            
                        ]
                    },
                            {
                            xtype: 'image',
                            name: 'logo_img',
                            itemId : 'logo_img',
                            src : logo,
                            width: 150,
                            height : 100,
                            labelWidth: 150,
                            labelStyle: ' font-weight:bold',                            
                            border: true,                   
                            },

                    {
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
                                        url: preurl + 'facturas/put_empresa',
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
