Ext.define('Infosys_web.view.Pago_caja.Apertura', {
    extend: 'Ext.window.Window',
    alias : 'widget.aperturacaja',

    requires: ['Ext.form.Panel',
               'Ext.form.field.Text'],

    title : 'Apertura de Caja',
    layout: 'fit',
    autoShow: true,
    width: 280,
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
                    //allowBlank: false,
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
                        width: 100,
                        labelWidth: 40,
                        maxHeight: 25,
                        matchFieldWidth: false,
                        listConfig: {
                            width: 150
                        },
                        itemId: 'cajaId',
                        fieldLabel: '<b>CAJA</b>',
                        fieldCls: 'required',
                        store: 'Cajas',
                        forceSelection : true,
                        valueField: 'id',
                        displayField: 'nombre'
                    },{
                        xtype: 'splitter'  
                    },{
                        xtype: 'combo',
                        width: 120,
                        labelWidth: 55,
                        maxHeight: 25,
                        matchFieldWidth: false,
                        listConfig: {
                            width: 200
                        },
                        itemId: 'cajeroId',
                        fieldLabel: '<b>CAJERO</b>',
                        fieldCls: 'required',
                        store: 'Cajeros',
                        forceSelection : true,
                        valueField: 'id',
                        displayField: 'nombre'
                    },{
                        xtype: 'numberfield',
                        fieldCls: 'required',
                        maxHeight: 25,
                        labelWidth: 105,
                        width: 120,
                        //allowBlank: false,
                        name: 'efectivo',
                        //readOnly: true,
                        itemId: 'efectuvoId',
                        fieldLabel: '<b>EFECTIVO</b>'

                    },{
                        xtype: 'numberfield',
                        fieldCls: 'required',
                        maxHeight: 25,
                        labelWidth: 105,
                        width: 120,
                        //allowBlank: false,
                        name: 'totcheques',
                        //readOnly: true,
                        itemId: 'totchequesId',
                        fieldLabel: '<b>CHEQUES</b>'

                    },{
                        xtype: 'numberfield',
                        fieldCls: 'required',
                        maxHeight: 25,
                        labelWidth: 105,
                        width: 120,
                        //allowBlank: false,
                        name: 'otrosmontos',
                        //readOnly: true,
                        itemId: 'otrosmontosId',
                        fieldLabel: '<b>OTROS</b>'

                    },{
                        xtype: 'numberfield',
                        fieldCls: 'required',
                        maxHeight: 25,
                        labelWidth: 105,
                        width: 120,
                        //allowBlank: false,
                        name: 'otrosmontos',
                        //readOnly: true,
                        itemId: 'recaudaId',
                        hidden: true

                    },{
                        xtype: 'datefield',
                        fieldCls: 'required',
                        maxHeight: 25,
                        labelWidth: 60,
                        width: 190,
                        fieldLabel: '<b>FECHA</b>',
                        itemId: 'fechaaperturaId',
                        name: 'fechaapertura',
                        format: 'd/m/Y',
                        submitFormat: 'd/m/Y',
                        value: new Date()
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
                text: 'Ingresar',
                action: 'mpagocaja2'
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
