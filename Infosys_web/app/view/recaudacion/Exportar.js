Ext.define('Infosys_web.view.recaudacion.Exportar', {
    extend: 'Ext.window.Window',
    alias : 'widget.exportarrecaudacion',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Exportar Recaudacion',
    layout: 'fit',
    autoShow: true,
    width: 280,
    height: 220,
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
                    },{
                            xtype: 'combo',
                            width: 100,
                            labelWidth: 40,
                            maxHeight: 25,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 150
                            },
                            itemId: 'cajaId',
                            fieldLabel: '<b>CAJA</b>',
                            fieldCls: 'required',
                            store: 'Cajas',
                            valueField: 'id',
                            //labelAlign: 'top',
                            displayField: 'nombre'
                        },{
                            xtype: 'splitter'  
                        },{
                            xtype: 'combo',
                            width: 120,
                            labelWidth: 55,
                            maxHeight: 25,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 200
                            },
                            itemId: 'cajeroId',
                            fieldLabel: '<b>CAJERO</b>',
                            fieldCls: 'required',
                            store: 'Cajeros',
                            valueField: 'id',
                            displayField: 'nombre'
                        },{
                            xtype: 'splitter'  
                        },{
                            xtype: 'combo',
                            width: 120,
                            labelWidth: 55,
                            maxHeight: 25,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 200
                            },
                            itemId: 'tipoId',
                            fieldLabel: '<b>TIPO</b>',
                            fieldCls: 'required',
                            store: 'recaudacion.Selector',
                            valueField: 'id',
                            displayField: 'nombre'
                        },{
                            xtype: 'splitter'  
                        },{
                            xtype: 'datefield',
                            fieldCls: 'required',
                            maxHeight: 25,
                            labelWidth: 60,
                            width: 190,
                            fieldLabel: '<b>FECHA</b>',
                            itemId: 'fechaId',
                            name: 'fechaapertura',
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d',
                            value: new Date()
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
                text: 'Exportar',
                action: 'exportarexcelrecaudacion'
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
