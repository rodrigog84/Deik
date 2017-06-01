Ext.define('Infosys_web.view.ventas.VerDetalleProductoStock' ,{
    extend: 'Ext.window.Window',
   // extend: 'Ext.form.Panel',
    alias : 'widget.verdetalleproductostock',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],

    title : 'Detalle Producto',
    autoHeight: false,

    autoShow: true,
    width: 1200,
    height: 480,



    /*title : 'Detalle Producto',
    layout: 'fit',
    autoShow: true,
    width: 1200,
    height: 450,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,*/
    initComponent: function() {
        me = this;
        idproducto = me.id_producto;

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

        /* var f = new Date();
         var mes_actual = f.getMonth() + 1;
         if(mes_actual < 10){
            mes_actual = "0" + mes_actual;
         }
         
         var anno_actual = f.getFullYear();*/

         var mes_actual = 0;
         var anno_actual = 0;


        var detalleProductos = Ext.create('Ext.data.Store', {
            fields: ['num','tipodocto','numdocto','fecha', 'precio' , 'cant_entradas', 'cant_salidas' , 'stock' , 'detalle'],
            pageSize: 8,
            autoLoad: true,
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/reporte_detalle_productos_stock',
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
                            valueField : 'value',
                            //value : mes_actual                           

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
                            valueField : 'anno',
                           // value : 2016                            

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-sheet',
                            text: 'Generar Kardex Existencia',
                            handler: function() {

                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    var mes = me.down('#mes').getValue();
                                    var anno = me.down('#anno').getValue();
                                    detalleProductos.proxy.extraParams = {mes : mes,
                                                                        anno : anno,
                                                                        idproducto : idproducto}
                                    detalleProductos.load();

                                    mes_actual = mes;
                                    anno_actual = anno;

                                }


                            }                            
                        },{
                            xtype: 'button',
                            iconCls : 'icon-pdf',
                            text: 'Exportar PDF',
                            handler: function() {
                                if(mes_actual != 0 && anno_actual != 0){
                                    window.open(preurl +'adminServicesPdf/reporte_detalle_productos_stock/' + idproducto +'/' +mes_actual + '/' + anno_actual)    
                                }                                
                            } 


                        },{                
                            xtype: 'button',
                            iconCls : 'icon-exel',
                            text: 'Exportar EXCEL',
                            handler: function() {
                                if(mes_actual != 0 && anno_actual != 0){
                                    window.open(preurl +'adminServicesExcel/reporte_detalle_productos_stock/' + idproducto +'/' +mes_actual + '/' + anno_actual)    
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
                            store : detalleProductos,
                            labelWidth: 50,
                            title: 'Detalle Productos',
                            height: 280,
                            columns: [
                                { text: '#',  dataIndex: 'num', flex: 1},
                                { text: 'Tipo Documento',  dataIndex: 'tipodocto', flex: 1},
                                { text: 'N&uacute;mero Docto',  dataIndex: 'numdocto', flex: 1  },
                                { text: 'Fecha Docto',  dataIndex: 'fecha', flex: 1, align: 'left'},
                                { text: 'Precio Costo',  dataIndex: 'precio', flex: 1 },
                                { text: 'Cantidad Entradas',  dataIndex: 'cant_entradas', flex: 1 },
                                { text: 'Cantidad Salidas',  dataIndex: 'cant_salidas', flex: 1},
                                { text: 'Stock',  dataIndex: 'stock', flex: 1},
                                { text: 'Detalle',  dataIndex: 'detalle', flex: 1}
                                ]

                }    
                ]    
               },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: detalleProductos,
            displayInfo: true
        }               



        ];
        
        this.callParent(arguments);
    }
});
