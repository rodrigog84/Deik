Ext.define('Infosys_web.view.precios.Subir', {
    extend: 'Ext.window.Window',
    alias : 'widget.subirprecios',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    //y: 50,
    title : 'Subir Precios en Excel',
    layout: 'fit',
    autoShow: true,
    width: 660,
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
                        xtype: 'filefield',
                        id: 'form-file',
                        labelWidth: 60,
                        width: 250,
                        emptyText: 'Excel',
                        fieldLabel: 'Archivo',
                        name: 'archivo',
                        itemId: 'archivoId',
                        buttonText: 'Examinar'
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>Fecha</b>',
                        items: [
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            maxHeight: 25,
                            labelWidth: 50,
                            width: 170,
                            //fieldLabel: '<b>FECHA</b>',
                            itemId: 'fechasubidaId',
                            name: 'fecha_subida',
                            value: new Date()
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>Numero</b>',
                        items: [
                        {
                                xtype: 'numberfield',
                                width: 130,
                                labelWidth: 40,
                                //fieldLabel: 'Numero',
                                name: 'numero',
                                itemId: 'numeroId',
                                style: 'font-weight: bold;'
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
                iconCls: '',
                action: 'Subir',
                text : 'Subir'
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
