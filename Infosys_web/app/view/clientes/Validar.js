Ext.define('Infosys_web.view.clientes.Validar', {
    extend: 'Ext.window.Window',
    alias : 'widget.clientesvalidar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Clientes',
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
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                      {
                    xtype: 'fieldset', 
                    height:60,
                    title: 'Ingreso de Datos',
                    items: [
                    {
                      xtype: 'container',
                      layout: {
                          type: 'vbox'
                      },
                      defaults: {
                          flex: 1
                      },
                      items: [
                      {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                        msgTarget: 'side',
                        fieldLabel: 'Rut Cliente',
                        xtype: 'textfield',
                        width: 250,
                        name : 'rut',
                        itemId: 'rutId',
                        allowBlank: true
                        },
                        {xtype: 'splitter'},
                        {
                          xtype: 'button',
                          iconCls: 'icon-add',
                          width: 75,
                          allowBlank: false,
                          action: 'validarut',
                          text : 'Validar'
                        }]
                      },]
                       }]
                     }]
            }
        ];
        
        this.callParent(arguments);
    }
});
