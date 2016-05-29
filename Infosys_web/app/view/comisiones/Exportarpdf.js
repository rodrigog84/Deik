Ext.define('Infosys_web.view.comisiones.Exportarpdf', {
    extend: 'Ext.window.Window',
    alias : 'widget.formularioexportarpdfcomisiones',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    //y: 50,
    title : 'Genera Comisiones',
    layout: 'fit',
    autoShow: true,
    width: 260,
    height: 180,
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
                    combineErrors: false,
                    labelWidth: 70,
                    msgTarget: 'side'
                },

                items: [
                      {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>DESDE</b>',
                        items: [
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            maxHeight: 25,
                            width: 130,
                            allowBlank: false,
                            itemId: 'fechaId',
                            value: new Date(),
                            name : 'fecha_ingreso',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                            
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>HASTA</b>',
                        items: [
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            maxHeight: 25,
                            width: 130,
                            allowBlank: false,
                            itemId: 'fecha2Id',
                            value: new Date(),
                            name : 'fecha_ingreso',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                            
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>TIPO</b>',
                        items: [
                        {
                            xtype: 'combo',
                            width: 150,
                            labelWidth: 55,
                            maxHeight: 25,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 200
                            },
                            itemId: 'tipoId',
                            fieldCls: 'required',
                            store: 'comisiones.Selector',
                            valueField: 'id',
                            displayField: 'nombre'
                            
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
                action: 'exportarPdfFormulario',
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
