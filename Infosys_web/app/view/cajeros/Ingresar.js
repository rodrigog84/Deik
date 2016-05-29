Ext.define('Infosys_web.view.cajeros.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.cajerosingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Cajeros',
    layout: 'fit',
    autoShow: true,
    width: 480,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
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
                        fieldLabel: 'id',
                        hidden:true
                    },
                    {
                        xtype: 'textfield',
                        name : 'nombre',
                        fieldLabel: 'Nombre Cajero'
                    },
                    {
                        xtype: 'textfield',
                        name : 'rut',
                        anchor: '52%',
                        fieldLabel: 'Rut Cajero'
                    },
                    {
                        xtype: 'textfield',
                        name : 'direccion',
                        fieldLabel: 'Direccion'
                    },
                    {
                        xtype: 'textfield',
                        name : 'fono',
                        fieldLabel: 'Fono'
                    },
                     {
                        xtype: 'numberfield',
                        name : 'comision',
                        anchor: '65%',
                        fieldLabel: 'Comision %'
                    },{
                        xtype: 'combo',
                        itemId: 'tipoEstadoId',
                        fieldLabel: 'Estado',
                        forceSelection : true,
                        anchor: '65%',
                        editable : false,
                        name : 'estado',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Estado",
                        store : 'vendedores.Activo',
                        allowBlank: false
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
                text: 'Grabar',
                action: 'grabarcajeros'
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
