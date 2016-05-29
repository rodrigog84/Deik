Ext.define('Infosys_web.view.tipo_movimiento.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.tipomovimientoingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Tipos de Movimientos',
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
                    //labelWidth: 300,
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
                        itemId: 'tipoCodigoId',
                        fieldLabel: 'Tipo',
                        name: 'id_tipo',
                        store: 'tipo_movimientos.Selector',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                    },{
                        xtype: 'textfield',
                        name : 'nombre',
                        fieldLabel: 'Descripcion'
                    },{
                        xtype: 'combo',
                        itemId: 'tipoCuentaId',
                        fieldLabel: 'Cuenta',
                        name: 'id_cuenta',
                        store: 'cuentascontable',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                         anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                    },{
                        xtype: 'combo',
                        itemId: 'tipoUsuarioId',
                        fieldLabel: 'Usuario Autorizado',
                        name: 'id_usuario',
                        store: 'usuarios.Selector',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                    },{
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Otros Datos',
                        cls: 'x-check-group-alt',
                        columns: [300, 300],
                        vertical: true,
                        items: [
                            {boxLabel: 'Correccion Monetaria', name: 'id_correccion', checked: false},
                            {boxLabel: 'Orden de Compra', name: 'id_orden_compra', checked: false},
                            {boxLabel: 'Estadisticas Compras', name: 'id_estad_compras', checked: false},
                            {boxLabel: 'Estadisticas Consumo', name: 'id_estad_consumo', checked: false},
                            {boxLabel: 'Pide Rut', name: 'id_rut',checked: false},
                            {boxLabel: 'Muestra Stock', name: 'id_stock',checked: false}
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
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'tipomovimientograbar'
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
