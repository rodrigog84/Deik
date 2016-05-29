Ext.define('Infosys_web.view.cotizaciones.Observacionespre', {
    extend: 'Ext.window.Window',
    alias : 'widget.observacionescotizapre',

    requires: ['Ext.form.Panel',
               'Ext.form.field.Text'],

    title : 'Observaciones Preventa',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 260,
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
                items: [ {
                        xtype: 'textfield',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textareafield',
                        fieldCls: 'required',
                        width: 500,
                        height: 140,
                        fieldLabel: 'Observaciones',
                        itemId: 'observaId',
                        name: 'observaciones'                            
                    }
                ]
            }
        ];
        
      this.dockedItems = [{
        xtype: 'toolbar',
        dock: 'bottom',
        id:'butons',
        ui: 'footer',
        items: ['->', {
            iconCls: 'icon-save',
            text: 'Ingresar',
            action: 'ingresaobspre'
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
