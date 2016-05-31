Ext.define('Infosys_web.view.facturaelectronica.LibroCompraVenta' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.librocompraventa',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Libros de Compra/Venta',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,
    initComponent: function() {
        me = this;
        var tipo_libro = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'compras', "nombre":"Compras"},
                {"value":'ventas', "nombre":"Ventas"}
            ]
        });

         var meses = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'01', "nombre":"Enero"},
                {"value":'02', "nombre":"Febrero"},
                {"value":'03', "nombre":"Marzo"},
                {"value":'04', "nombre":"Abril"},
                {"value":'05', "nombre":"Mayo"},
                {"value":'06', "nombre":"Junio"},
                {"value":'07', "nombre":"Julio"},
                {"value":'08', "nombre":"Agosto"},
                {"value":'09', "nombre":"Septiembre"},
                {"value":'10', "nombre":"Octubre"},
                {"value":'11', "nombre":"Noviembre"},
                {"value":'12', "nombre":"Diciembre"}
            ]
        });


         var annos = Ext.create('Ext.data.Store', {
            fields: ['anno'],
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/get_annos',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        }); 

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: true,
                style: 'background-color: #fff;',
                items: [
                {
                            xtype: 'combobox',
                            width: 500,
                            store : tipo_libro,
                            fieldLabel: 'Tipo de Libro',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipo_libro' ,
                            name : 'tipo_libro' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value'                            

                    },
                  {
                            xtype: 'combobox',
                            width: 500,
                            store : meses,
                            fieldLabel: 'Mes',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'mes' ,
                            name : 'mes' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value'                            

                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : annos,
                            fieldLabel: 'A&ntilde;o',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'anno' ,
                            name : 'anno' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'anno',
                            valueField : 'anno'                            

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-download',
                            text: 'Generar XML Libro',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/genera_libro',
                                        //standardSubmit: true,//true, <---------
                                        waitMsg: 'Generando XML Libro...',
                                        success: function(fp, o) {
                                            Ext.Msg.alert('Atención', o.result.message);

                                            if(o.result.valido){
                                                // muestra archivo generado
                                                window.open(gbl_site + 'core/facturacion_electronica/libros/' + o.result.nombre_archivo,'_blank');
                                            }
                                            // borra archivo generado
                                            /*Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/unlink_fe/tmp/'+o.result.nombre_archivo});*/

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
