Ext.define('Infosys_web.view.ventas.EstadisticasVentas' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.estadisticasventas',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Estad&iacute;sticas de Ventas',
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


        var estadisticasVentas = Ext.create('Ext.data.Store', {
            fields: ['num','codigo','nombre','unidades', 'ventaneta' , 'costo', 'margen' , 'porcmargen'],
            pageSize: 10,
            autoLoad: true,
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/reporte_estadisticas_ventas',
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
                            text: 'Generar Reporte Mensual',
                             handler: function() {

                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    var mes = me.down('#mes').getValue();
                                    var anno = me.down('#anno').getValue();
                                    estadisticasVentas.proxy.extraParams = {mes : mes,
                                                                        anno : anno}
                                    estadisticasVentas.load();

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
                                    window.open(preurl +'adminServicesPdf/reporte_estadisticas_ventas/' + mes_actual + '/' + anno_actual)    
                                }
                                

                            } 


                        },{                
                            xtype: 'button',
                            iconCls : 'icon-exel',
                            text: 'Exportar EXCEL',
                            handler: function() {
                                if(mes_actual != 0 && anno_actual != 0){
                                    window.open(preurl +'adminServicesExcel/reporte_estadisticas_ventas/' + mes_actual + '/' + anno_actual)    
                                }
                                

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
                            store : estadisticasVentas,
                            labelWidth: 50,
                            title: 'Estad&iacute;sticas de Ventas',
                            height: 300,
                            columns: [
                                { text: '#',  dataIndex: 'num', flex: 1},
                                { text: 'Cod. Producto',  dataIndex: 'codigo', flex: 1},
                                { text: 'Descripci&oacute;n Producto',  dataIndex: 'nombre', flex: 1  },
                                { text: 'Unidades',  dataIndex: 'unidades', flex: 1, align: 'left'},
                                { text: 'Venta Neta',  dataIndex: 'ventaneta', flex: 1 },
                                { text: 'Costo Venta',  dataIndex: 'costo', flex: 1 },
                                { text: 'Margen Neto',  dataIndex: 'margen', flex: 1},
                                { text: '% Margen',  dataIndex: 'porcmargen', flex: 1},
                                ]

                }    
                ]    
               },

        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: estadisticasVentas,
            displayInfo: true
        }

        ];
        
        this.callParent(arguments);
    }
});