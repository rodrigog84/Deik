Ext.define('Infosys_web.view.vigentes.Exportar', {
    extend: 'Ext.window.Window',
    alias : 'widget.vigentesexportar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    //y: 50,
    title : 'Genera Archivo SVS',
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
                    combineErrors: false,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name : 'id_nombre',
                        fieldLabel: 'accionId',
                        allowBlank: true,
                        itemId: 'accionId',
                        hidden:true
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Fecha de Proceso',
                        items: [
                        {
                            xtype: 'combo',
                            itemId: 'tipoSeleccionmesId',
                            fieldLabel: '',
                            forceSelection : true,
                            editable : false,
                            valueField : 'id',
                            itemId: 'mesId',
                            allowBlank: false,
                            displayField : 'nombre',
                            emptyText : "Mes Proceso",
                            store : 'vigente.Selectormes'
                        },{
                            xtype: 'splitter'  
                        },{
                            xtype: 'combo',
                            itemId: 'tipoSeleccionanoId',
                            fieldLabel: '',
                            forceSelection : true,
                            editable : false,
                            valueField : 'id',
                            allowBlank: false,
                            itemId: 'anoId',
                            displayField : 'nombre',
                            emptyText : "Año Proceso",
                            store : 'vigente.Selectorano'
                        }
                        ]
                    }
                ]

                /*items: [{
                            xtype: 'button',
                            allowBlank: true,
                            iconCls: 'icon-search',
                            action: 'exporttxt',
                            text : 'Generar'
                        }                   
                ]*/



            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-search',
                action: 'exporttxt',
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
