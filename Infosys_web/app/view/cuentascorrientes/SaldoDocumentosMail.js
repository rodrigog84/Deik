Ext.define('Infosys_web.view.cuentascorrientes.SaldoDocumentosMail' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.saldodocumentosmail',
    

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Envio de Saldo por Mail',
    layout: 'fit',
    autoShow: true,
    width: 450,
    height: 250,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'rutcliente',
                        itemId : 'rutcliente',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        name : 'nombrecliente',
                        itemId : 'nombrecliente',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        name : 'cuentacontable',
                        itemId : 'cuentacontable',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 70,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            width: 400,
                            name: 'email',
                            itemId: 'email',
                            vtype: 'email'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 70,
                        items: [{
                            xtype: 'textareafield',
                            width: 400,
                            allowBlank: false,
                            rows: 8,
                            name: 'mensaje',
                            itemId: 'mensaje',
                            fieldLabel: 'Mensaje'
                        }]



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
                iconCls: 'icon-email_send',
                text: 'Enviar',
                action: 'saldoenviomail'
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
