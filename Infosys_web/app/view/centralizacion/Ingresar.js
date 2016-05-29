Ext.define('Infosys_web.view.centralizacion.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.cuentascentraliza',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Cuentas',
    layout: 'fit',
    autoShow: true,
    width: 480,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
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
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'combo',
                        itemId: 'tipoMovimientoId',
                        fieldLabel: 'Tipo Movimiento',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'tipo_movimiento',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'Tipo_movimiento',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'C_IngresoId',
                        fieldLabel: 'Cuenta Ingreso',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_cingreso',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'ccostoId',
                        fieldLabel: 'Cuenta Costo',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_ccosto',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'cboletasId',
                        fieldLabel: 'Cuenta Boletas',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_cboleta',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'civacreditoId',
                        fieldLabel: 'Cuenta Iva Credito',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_civacredito',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'civadebitoId',
                        fieldLabel: 'Cuenta Iva Debito',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_civadebito',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'ccreditoId',
                        fieldLabel: 'Cuenta Credito',
                        forceSelection : true,
                        anchor: '85%',
                        editable : false,
                        name : 'id_ccredito',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'cuentascontable',
                        allowBlank: false
                    }
                    /*
                    ,
                    {
                        xtype: 'filefield',
                        id: 'form-file',
                        emptyText: 'Seleccione el archivo',
                        fieldLabel: 'Foto',
                        name: 'foto',
                        allowBlank: true,
                        buttonText: 'Examinar'
                    }*/
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
                action: 'grabarcentraliza'
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
