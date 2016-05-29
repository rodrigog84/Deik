Ext.define('Infosys_web.view.cuentascorrientes.AsociaCuenta', {
    extend: 'Ext.window.Window',
    alias : 'widget.asociacuenta',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Asociar Cuentas',
    layout: 'fit',
    autoShow: true,
    width: 480,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {

         var st_imputacion = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":"SI", "nombre":"SI"},
                {"value":"NO", "nombre":"NO"}
            ]
        });

         var st_tipo_cancelacion = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":"CARGO", "nombre":"CARGO"},
                {"value":"ABONO", "nombre":"ABONO"}
            ]
        });

        this.items = [
            {
                xtype: 'form',
                fileUpload: true,
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
                        xtype: 'textfield',
                        itemId: 'cuentaId',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        itemId: 'cuenta',
                        fieldLabel: 'Cuenta',
                        anchor: '85%',
                        name : 'cuenta',
                        valueField : 'id',
                        displayField : 'nombre',
                        store : 'Tipo_movimiento',
                        allowBlank: false,
                        readOnly : true
                    },{
                        xtype: 'combo',
                        itemId: 'imputacion',
                        fieldLabel: 'Imputacion',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'imputacion',
                        valueField : 'value',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : st_imputacion,
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'tipocancelacion',
                        fieldLabel: 'Tipo Cancelaci&oacute;n',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'tipocancelacion',
                        valueField : 'value',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : st_tipo_cancelacion,
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
                action: 'grabarasociacuenta'
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
