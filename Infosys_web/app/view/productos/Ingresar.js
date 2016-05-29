Ext.define('Infosys_web.view.productos.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.productosingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar Productos',
    layout: 'fit',
    autoShow: true,
    width: 850,
    modal: true,
    iconCls: 'icon-sheet',

    layout: {
                type: 'fit'
            },

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            bodyPadding: 30,
            frame: true,
            border: false,
            fieldDefaults: {
            anchor: '100%',
            labelAlign: 'left',
            combineErrors: true,
            labelWidth: 150,
            msgTarget: 'side'
            },

            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                anchor: '100%',
                items: [
            {
                xtype: 'textfield',
                name : 'codigo',
                fieldLabel: 'Codigo'
                          
            }]
        },{
            xtype: 'textfield',
            name : 'nombre',
            fieldLabel: 'Nombre Producto',
            anchor: '80%'
        },{
            xtype: 'textfield',
            name : 'id',
            itemId: 'Id',
            fieldLabel: 'id',
            hidden:true
        },{
            xtype: 'combo',
            itemId: 'marcaId',
            fieldLabel: 'Marca',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_marca',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Marcas'
        },{
            xtype: 'combo',
            itemId: 'tipobodegaId',
            fieldLabel: 'Bodega',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_bodega',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Bodegas'
        },{
            xtype: 'combo',
            itemId: 'tipofamiliaId',
            fieldLabel: 'Familias',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_familia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Familias'
        },{
            xtype: 'combo',
            itemId: 'tipoagrupacionId',
            fieldLabel: 'Agrupaciones',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_agrupacion',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Agrupacion'
        },{
            xtype: 'combo',
            itemId: 'tiposubfamiliaId',
            fieldLabel: 'Sub Familia',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_subfamilia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Subfamilia'
                    },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
                xtype: 'combo',
                itemId: 'tipoUbicaId',
                fieldLabel: 'Ubicacion Fisica',
                forceSelection : true,
                anchor: '65%',
                editable : false,
                name : 'id_ubi_prod',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Ubicas'
            },{xtype: 'splitter'},{
                xtype: 'combo',
                itemId: 'tipounimedidaId',
                fieldLabel: 'Unidad de Medida',
                forceSelection : true,
                editable : false,
                name : 'id_uni_medida',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Medidas'
            }]
        },{
            xtype: 'fieldset',
            title: 'Precios',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Ultima Compra',
                    name:'p_ult_compra',
                    //anchor: '20%',
                    readOnly : true
                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Mayor Compra',
                    name:'p_may_compra',
                    //anchor: '20%',
                    readOnly : true
                }

                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Promedio',
                    name:'p_promedio',
                    //anchor: '20%',
                    readOnly : true
                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Venta',
                    name:'p_venta',
                    //anchor: '20%',
                    readOnly : true
                }

                ]
            },,{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Costo',
                    name:'p_costo',
                    //anchor: '20%',
                    readOnly : true
                }

                ]
            },
            ]
        },{
            xtype: 'fieldset',
            title: 'Inventario',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Stock',
                    name:'stock',
                    anchor: '30%',
                    readOnly : true
                }

                ]
            }
            ]
        }]
    }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarproductos'
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
