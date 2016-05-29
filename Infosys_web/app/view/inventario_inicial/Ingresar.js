Ext.define('Infosys_web.view.inventario_inicial.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.inventarioprimario',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Ingreso Inventario',
    layout: 'fit',
    autoShow: true,
    width: 880,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {

        var stItms = Ext.getStore('InventarioInicial');
        stItms.removeAll();
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                //labelWidth: 150,

                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name : 'id',
                        anchor: '35%',
                        itemId: 'numero_id',
                        labelWidth: 150,
                        fieldLabel: 'Numero Inventario',
                        hidden: true

                    },{
                        xtype: 'combo',
                        itemId: 'tipobodegaId',
                        fieldLabel: 'Bodegas',
                        forceSelection : true,
                        anchor: '58.5%',
                        editable : false,
                        name : 'id_bodega',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'Bodegas',
                        allowBlank: false
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                        {
                            xtype: 'combo',
                            align: 'center',
                            itemId: 'productoId',
                            fieldLabel: 'Producto',
                            name: 'Productos',
                            store: 'Productosf',
                            queryMode: 'local',
                            forceSelection: true,
                            displayField: 'nombre',
                            valueField: 'id',
                            listConfig: {
                                minWidth: 450
                                }, 
                                    width: 550
                                },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar',
                                maxHeight: 25,
                                width: 60,
                                allowBlank: true,
                                action: 'buscarproductosinicial'
                            },
                          {xtype: 'splitter'},
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha',
                            //anchor: '25%',
                            labelWidth: 45,
                            name:'fecha',
                            format: 'd/m/Y',
                            submitFormat: 'd/m/Y',
                            itemId: 'fechaid',
                            value: new Date()
                        }]
                        },
                     {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Cantidad',
                            anchor: '50%',
                            name: 'cantidad',
                            minValue: 0,
                            itemId: 'cantidadId'
                        },
                          {xtype: 'splitter'},
                        
                        {
                            xtype: 'button',
                            text: 'Agregar',
                            iconCls: 'icon-plus',
                            anchor: '50%',
                            //flex: 1,
                            allowBlank: true,
                            action: 'agregarInventarioInicial'
                        }]
                        },
                        {
                          xtype: 'fieldset',
                          title: 'Ingreso Inventario',
                          height:330,
                          items: [{
                                  xtype: 'grid',
                                  tbar: [

                                    {
                                        xtype: 'button',
                                        text: 'Eliminar',
                                        iconCls: 'icon-delete',
                                        allowBlank: true,
                                        action: 'eliminarInventarioInicial'
                                    }
                                    ],
                                  itemId: 'inventarioinicialId',
                                  title: 'Inventario Inicial',
                                  store: 'InventarioInicial',
                                  height: 300,
                                  columns: [
                                      { text: 'Bodega',  dataIndex: 'n_bodega', width: 350 },
                                      { text: 'Bodega',  dataIndex: 'bodega', width: 350, hidden:true},
                                      { text: 'Producto', dataIndex: 'n_producto', width: 150},
                                      { text: 'Producto', dataIndex: 'producto', width: 150, hidden:true},
                                      { text: 'Fecha', dataIndex: 'fecha', width: 150},
                                      { text: 'Cantidad', dataIndex: 'cantidad', width: 80}
                                  ]
                              }],
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Imprimir',
                action: 'imprimirinforme'
            },'-',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarInventarioInicial'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
