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

         var tipocarga = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'sis', "nombre":"Datos Sistema"},
                {"value":'csv', "nombre":"Datos Csv"}
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


         var loglibros = Ext.create('Ext.data.Store', {
            fields: ['nro','id','mes','anno','tipo_libro','fecha_creacion'],
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/librosgetAll',
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
                items: [{
                            xtype: 'combobox',
                            width: 500,
                            store : tipocarga,
                            fieldLabel: 'Tipo Carga',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipocarga' ,
                            name : 'tipocarga' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value',
                            value : 'sis',

                           listeners: {
                               select:{
                                   fn:function(combo, value) {
                                      var val_sel = value[0].data.value;
                                      if(val_sel == 'csv'){
                                        me.down('#form-file').setDisabled(false);
                                        //me.down('#form-file').validateBlank(true);
                                        
                                      }else{
                                        me.down('#form-file').setValue('');
                                        me.down('#form-file').setDisabled(true);
                                       // me.down('#form-file').validateBlank(true);
                                      }
                                      
                                   }
                               },
                               scope: me
                           }                   

                    },
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
                            xtype: 'filefield',
                            id: 'form-file',
                            width: 500,
                            emptyText: 'csv .csv',
                            fieldLabel: 'Archivo csv',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            name: 'csv',
                            allowBlank : true,
                            buttonText: 'Examinar',
                            disabled : true,
                            forceSelection: true, 
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.csv' // or w/e type
                                  });
                                }
                            }                            

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
                                            me.down('#itemsgridId').store.reload();
                                            Ext.Msg.alert('Atención', o.result.message);

                                            /*if(o.result.valido){
                                                // muestra archivo generado
                                                window.open(gbl_site + 'core/facturacion_electronica/libros/' + o.result.nombre_archivo,'_blank');
                                            }*/
                                            // borra archivo generado
                                            /*Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/unlink_fe/tmp/'+o.result.nombre_archivo});*/

                                        }
                                    }); 
                                }
                            }                            
                        }]
                    },
                    ]

            },{
                xtype: 'form',
                padding: '5 5 0 5',
                border: true,
                frame: false,
                style: 'background-color: #fff;',
                items: [
                {

                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle Libros',
                            labelWidth: 50,
                            store: loglibros,
                            height: 210,
                            columns: [
                                {
                                        header: "Id Libro",
                                        flex: 1,
                                        dataIndex: 'id',
                                        align: 'right',
                                        hidden: true
                                               
                                    },
                                    { header: '#',  dataIndex: 'nro', width: 50  },
                                    {
                                        header: "Mes",
                                        flex : 1,
                                        dataIndex: 'mes',
                                        align: 'left'
                                    },{
                                        header: "A&ntilde;o",
                                        flex : 1,
                                        dataIndex: 'anno'
                                    },{         
                                        header: "Tipo Libro",
                                        flex : 1,
                                        dataIndex: 'tipo_libro'
                                    },{         
                                        header: "Fecha Creaci&oacute;n",
                                        flex : 1,
                                        dataIndex: 'fecha_creacion'
                                    },{
                                            header: "Ver XML",
                                            xtype:'actioncolumn',
                                            width:70,
                                            align: 'center',
                                            items: [{
                                                icon: 'images/download-icon.png',  // Use a URL in the icon config
                                                tooltip: 'Descargar XML',
                                                handler: function(grid, rowIndex, colIndex) {
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    //salert("Edit " + rec.get('firstname'));
                                                    var vista = this.up('librocompraventa');
                                                    vista.fireEvent('verEstadoDte',rec,4)
                                                }
                                            }]
                                    },{
                                        header: "Env&iacute;o SII",
                                        xtype:'actioncolumn',
                                        width:70,
                                        align: 'center',
                                        items: [{
                                            iconCls: 'icon-upload',  // Use a URL in the icon config
                                            tooltip: 'Ver Estado Env&iacute;o',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                //salert("Edit " + rec.get('firstname'));
                                                var vista = this.up('librocompraventa');
                                                vista.fireEvent('verEstadoDte',rec,6)
                                            },
                                            isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                // Returns true if 'editable' is false (, null, or undefined)
                                                if(record.get('estado') == 'Pendiente'){
                                                    return true;
                                                }else{
                                                    return false;
                                                }
                                            }                
                                        }]     
                                    
                                }
                                ]

                }    
                ]    
               }    
        ];
        
        this.callParent(arguments);
    }
});
