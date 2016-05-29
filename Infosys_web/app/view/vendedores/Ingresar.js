Ext.define('Infosys_web.view.vendedores.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.vendedoresingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Vendedores',
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
                        name : 'rut',
                        itemId: 'rutId',
                        fieldLabel: 'Rut Vendedor'
                    },
                    {
                        xtype: 'textfield',
                        name : 'valida',
                        itemId: 'validaId',
                        fieldLabel: 'Valida',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        name : 'nombre',
                        itemId: 'nombreId',
                        fieldLabel: 'Nombre Vendedor'
                    },{
                            xtype: 'textfield',
                            anchor: '80%',
                            //value: '123456',
                            fieldLabel: 'Clave Acceso',
                            name: 'password',
                            itemId: 'enterId',
                            inputType: 'password'
                    },{
                        xtype: 'textfield',
                        name : 'direccion',
                        itemId: 'direccionId',
                        fieldLabel: 'Direccion'
                    },
                    {
                        xtype: 'textfield',
                        name : 'fono',
                        itemId: 'fonoId',
                        fieldLabel: 'Fono'
                    },
                     {
                        xtype: 'numberfield',
                        name : 'comision',
                        itemId: 'comisionId',
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
                action: 'grabarvendedores'
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
