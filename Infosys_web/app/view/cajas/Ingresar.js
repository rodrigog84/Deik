Ext.define('Infosys_web.view.cajas.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.cajasingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Cajas',
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
                        fieldLabel: 'Nombre Caja'
                    },
                    {
                        xtype: 'combo',
                        itemId: 'tipocajeroId',
                        fieldLabel: 'Cajero',
                        name: 'id_cajero',
                        store: 'Cajeros',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                        
                    },
                    {
                        xtype: 'textfield',
                        name : 'correlativo',
                        fieldLabel: 'Correlativo'
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
                action: 'grabarcajas'
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
