Ext.define('Infosys_web.view.ventas.Ventas', {
    extend: 'Ext.window.Window',
    alias : 'widget.ventasingresar',
    
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

         
    xtype: 'test',
    title: 'Ingreso Ventas',
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
            xtype: 'textfield',
            fieldLabel: 'Codigo',
            anchor: '40%'
        },{
            xtype: 'textfield',
            fieldLabel: 'Descripcion',
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
        },
        {
            xtype: 'fieldset',
            title: 'Ultimos Movimientos',
            items: [
            {
                xtype: 'grid',
                anchor: '100%',
                //store: Ext.data.StoreManager.lookup('simpsonsStore'),
                columns: [
                    { text: 'Name',  dataIndex: 'name', flex: 1  },
                    { text: 'Email', dataIndex: 'email', flex: 1 },
                    { text: 'Phone', dataIndex: 'phone', flex: 1  }
                ],
                height: 200,
                width: 750
            }
            ]
        }
        ]
    }

    ]
});