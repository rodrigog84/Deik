Ext.define('Infosys_web.view.ventas.InformeStock' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.informestock',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Informe Stock',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,

    initComponent: function() {
        me = this;
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


         var familia = Ext.create('Ext.data.Store', {
            fields: ['id','nombre'],
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/get_familias',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        }); 


         var subfamilia = Ext.create('Ext.data.Store', {
            fields: ['id','nombre'],
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/get_subfamilias',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        }); 



         var agrupacion = Ext.create('Ext.data.Store', {
            fields: ['id','nombre'],
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/get_agrupaciones',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        }); 


         var marcas = Ext.create('Ext.data.Store', {
            fields: ['id','nombre'],
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/get_marcas',
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

         var id_familia = 0;
         var id_subfamilia = 0;
         var id_agrupacion = 0;
         var id_marca = 0;
         var producto = 0;


         /*var stockProductos = Ext.create('Ext.data.Store', {
            fields: ['codigo', 'descripcion' , 'fec_ult_compra', 'costo' , 'precio_venta' , 'stock1', 'stock2', 'stock3', 'stock4'],
            data : [
                {"codigo":'', "descripcion":"" , "fec_ult_compra":"" , "costo":"" , "precio_venta":"" , "stock1":"", "stock2":"", "stock3":"", "stock4":""},
            ]
        });*/

        var stockProductos = Ext.create('Ext.data.Store', {
            fields: ['id','num','codigo', 'descripcion' , 'fecha_ult_compra', 'p_costo' , 'p_venta' , 'stock1', 'stock2', 'stock3', 'stock4'],
            pageSize: 7,
            autoLoad: true,
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/reporte_stock',
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
                            store : familia,
                            fieldLabel: 'Familia',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            editable: false,
                            itemId : 'familia' ,
                            name : 'familia' ,
                            emptyText : 'Seleccionar',
                            //forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'id',
                            listeners: {
                                change: function() {
                                    var id_familia = me.down('#familia').getValue() == 'Seleccionar' ? '' : me.down('#familia').getValue();
                                    subfamilia.proxy.extraParams = {id_familia : id_familia}
                                    subfamilia.load();    

                                    agrupacion.proxy.extraParams = {id_familia : id_familia}
                                    agrupacion.load(); 

                                    me.down('#subfamilia').setValue("");
                                    me.down('#agrupacion').setValue("");
                                }
                            }                      

                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : subfamilia,
                            fieldLabel: 'Subfamilia',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'subfamilia' ,
                            name : 'subfamilia' ,
                            submitEmptyText : false,
                            //forceSelection: true, 
                            //allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'id',
                            listeners: {
                                change: function() {
                                    var id_familia = me.down('#familia').getValue() == 'Seleccionar' ? '' : me.down('#familia').getValue();
                                    var id_subfamilia = me.down('#subfamilia').getValue() == 'Seleccionar' ? '' : me.down('#subfamilia').getValue();
                                    agrupacion.proxy.extraParams = {id_familia : id_familia,
                                                                    id_subfamilia : id_subfamilia}
                                    agrupacion.load();                                    
                                    me.down('#agrupacion').setValue("");
                                }
                            }                              
                                             

                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : agrupacion,
                            fieldLabel: 'Agrupaci&oacute;n',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'agrupacion' ,
                            name : 'agrupacion' ,
                            submitEmptyText : false,
                            //forceSelection: true, 
                            //allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'id',
                                         

                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : marcas,
                            fieldLabel: 'Marca',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'marca' ,
                            name : 'marca' ,
                            submitEmptyText : false,
                            //forceSelection: true, 
                            //allowBlank : false,
                           displayField : 'nombre',
                            valueField : 'id',
                                         

                    },{
                            xtype: 'textfield',
                            width: 500,
                            store : marcas,
                            fieldLabel: 'Producto',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Ingrese Nombre Producto',
                            itemId : 'producto' ,
                            name : 'producto',
                            submitEmptyText : false,
                            //forceSelection: true, 
                            //allowBlank : false,
                           displayField : 'nombre',
                            valueField : 'id',
                                         

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-sheet',
                            text: 'Generar Reporte Stock',
                            handler: function() {
                                var id_familia = me.down('#familia').getValue() == 'Seleccionar' ? '' : me.down('#familia').getValue();
                                var id_subfamilia = me.down('#subfamilia').getValue() == 'Seleccionar' ? '' : me.down('#subfamilia').getValue();
                                var id_agrupacion = me.down('#agrupacion').getValue() == 'Seleccionar' ? '' : me.down('#agrupacion').getValue();
                                var id_marca = me.down('#marca').getValue() == 'Seleccionar' ? '' : me.down('#marca').getValue();
                                var producto = me.down('#producto').getValue() == '' ? '' : me.down('#producto').getValue();
                                stockProductos.proxy.extraParams = {familia : id_familia,
                                                                    subfamilia : id_subfamilia,
                                                                    agrupacion : id_agrupacion,
                                                                    marca : id_marca,
                                                                    producto : producto}
                                stockProductos.load();
                            }                            
                        },/*{
                            xtype: 'button',
                            iconCls : 'icon-pdf',
                            text: 'Exportar PDF',
                            handler: function() {
                                    window.open(preurl +'adminServicesPdf/reporte_stock/' + id_familia + '/' + id_subfamilia + '/' + id_agrupacion + '/' + id_marca)    
                            } 


                        },*/{                
                            xtype: 'button',
                            iconCls : 'icon-exel',
                            text: 'Exportar EXCEL',
                            handler: function() {
                                    console.log(me.down('#marca').getValue());
                                    var id_familia = me.down('#familia').getValue() == null ? 0 : me.down('#familia').getValue();
                                    var id_subfamilia = me.down('#subfamilia').getValue() == null ? 0 : me.down('#subfamilia').getValue();
                                    var id_agrupacion = me.down('#agrupacion').getValue() == null ? 0 : me.down('#agrupacion').getValue();
                                    var id_marca = me.down('#marca').getValue() == null ? 0: me.down('#marca').getValue();
                                    var producto = me.down('#producto').getValue() == '' ? 0 : me.down('#producto').getValue();
                                    var id_familia = id_familia == '' ? 0 : id_familia;
                                    var id_subfamilia = id_subfamilia == '' ? 0 : id_subfamilia;
                                    var id_agrupacion = id_agrupacion == '' ? 0 : id_agrupacion;
                                    var id_marca = id_marca == '' ? 0 : id_marca;
                                    var producto = producto.replace(" ","%20");

                                    window.open(preurl +'adminServicesExcel/reporte_stock/' + id_familia + '/' + id_subfamilia + '/' + id_agrupacion + '/' + id_marca + '/' + producto)    
                                

                            }
                        },{
                            xtype: 'button',
                            iconCls: 'icon-delete',
                            action: 'cerrarfactura',
                            text : 'Cerrar'
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
                            store : stockProductos,
                            labelWidth: 50,
                            title: 'Detalle Productos',
                            height: 250,
                            columns: [
                                { text: 'id',  dataIndex: 'id', hidden: true, flex: 1},
                                { text: '#',  dataIndex: 'num', flex: 1},
                                { text: 'C&oacute;digo',  dataIndex: 'codigo', flex: 1},
                                { text: 'Descripci&oacute;n',  dataIndex: 'descripcion', flex: 1  },
                                { text: 'Fecha &Uacute;ltima Compra',  dataIndex: 'fecha_ult_compra', flex: 1, align: 'left'},
                                { text: 'Precio Costo',  dataIndex: 'p_costo', flex: 1 },
                                { text: 'Precio Venta',  dataIndex: 'p_venta', flex: 1 },
                                { text: 'Stock 1',  dataIndex: 'stock1', flex: 1},
                                { text: 'Stock 2',  dataIndex: 'stock2', flex: 1},
                                { text: 'Stock 3',  dataIndex: 'stock3', flex: 1},
                                { text: 'Stock 4',  dataIndex: 'stock4', flex: 1},
                                {
                                    header: "Detalle",
                                    xtype:'actioncolumn',
                                    width:80,
                                    align: 'center',
                                    items: [{
                                        icon: 'images/search_page.png',  // Use a URL in the icon config
                                        tooltip: 'Ver Detalle Producto',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var vista = this.up('informestock');
                                            vista.fireEvent('verDetalleProductoStock',rec)
                                        }
                                    }]
                                    }
                                ]

                }    
                ]    
               },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: stockProductos,
            displayInfo: true
        }               



        ];
        
        this.callParent(arguments);
    }
});
