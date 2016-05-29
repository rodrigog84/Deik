Ext.define('Infosys_web.view.productos.Productos', {
    extend: 'Ext.window.Window',
    alias : 'widget.productosproductos',
    
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

         
    xtype: 'test',
    title: 'Desplegar Productos',
    iconCls: 'icon-money',
        
    
    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        frame: true,
        border: false,
        items: [
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
                xtype: 'textfield',
                name : 'cod_barra',
                fieldLabel: 'Codigo de Barra'
                //anchor: '30%'
            },
            {
               itemId: 'imgpanel',
               border: false,
               margin: 8
            },{
                xtype: 'filefield',
                id: 'form-file',
                emptyText: 'Foto',
                fieldLabel: 'Archivo',
                name: 'foto',
                buttonText: 'Examinar'
            }

            ]
        },{
            xtype: 'textfield',
            name : 'nom_producto',
            fieldLabel: 'Nombre Producto',
            anchor: '80%'   
        },{
            xtype: 'textfield',
            fieldLabel: 'Marca',
            anchor: '80%'   
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
                store : 'Ubicas',
                allowBlank: true
            },{
                xtype: 'combo',
                itemId: 'tipoMedidaId',
                fieldLabel: 'Unidad de Medida',
                forceSelection : true,
                anchor: '65%',
                editable : false,
                name : 'id_uni_medida',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Medidas',
                allowBlank: true
            }]
        },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Barra',
                anchor: '30%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Medida',
                anchor: '30%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Ubicacion',
                anchor: '30%'
            }

            ]
        },{
            xtype: 'fieldset',
            title: 'Valores',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Barra',
                    anchor: '30%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Medida',
                    anchor: '30%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ubicacion',
                    anchor: '30%'
                }

                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Barra',
                    anchor: '30%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Medida',
                    anchor: '30%'
                }

                ]
            }
            ]
        }]
    }]

});