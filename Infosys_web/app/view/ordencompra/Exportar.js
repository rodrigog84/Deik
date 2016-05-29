Ext.define('Infosys_web.view.ordencompra.Exportar', {
    extend: 'Ext.window.Window',
    alias : 'widget.formularioexportar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    //y: 50,
    title : 'EXPORTA A EXCEL',
    layout: 'fit',
    autoShow: true,
    width: 400,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
     
        this.items = [
            {
                xtype: 'form',
                padding: '5 15 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    //anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: false,
                    labelWidth: 140,
                    msgTarget: 'side'
                },

                items: [
                      {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>ESTADO DE ORDEN</b>',
                        items: [
                        {
                                xtype: 'combo',
                                align: 'center',
                                itemId: 'estadosId',
                                //fieldLabel: 'Estado',
                                name: 'estado',
                                store: 'estados',
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'nombre',
                                valueField: 'id',
                                listConfig: {
                                    minWidth: 220
                                }, 
                                    width: 220
                            }
                        ]
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
                iconCls: 'icon-search',
                action: 'exportarExcelrecepcion',
                text : 'Generar'
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
