Ext.define('Infosys_web.view.Pago_caja.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pagocajaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Pago en Caja',
    store: 'Preventa',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
         hidden : true
               
    },{
        header: "Ticket",
        flex: 1,
        dataIndex: 'num_ticket'
               
    },{
        header: "Tipo Documento",
        flex: 1,
        dataIndex: 'id_tip_docu',
        hidden : true
               
    },{
        header: "Forma de Pago",
        flex: 1,
        dataIndex: 'id_pago',
        hidden : true
               
    },{
        header: "Documento",
        flex: 1,
        dataIndex: 'nom_documento'
               
    },{
        header: "Fecha Venta",
        flex: 1,
        dataIndex: 'fecha_venta',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    },{
        header: "Rut",
        flex: 1,
        align: 'right',
        dataIndex: 'rut_cliente'
    },{
        header: "Id Cliente",
         width: 390,
        dataIndex: 'id_cliente',
        hidden: true
    },{
        header: "Razon Social",
         width: 390,
        dataIndex: 'nom_cliente'
    },{
        header: "Giro",
         width: 390,
        dataIndex: 'nom_giro',
        hidden: true
    },{
        header: "Direccion",
         width: 390,
        dataIndex: 'direccion',
        hidden: true
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        aling: 'rigth',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'desc',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
        
    },{
        header: "Id Sucursal",
        flex: 1,
        dataIndex: 'id_sucursal',
        hidden: true
    },{
        header: "Direccion Sucursal",
        flex: 1,
        dataIndex: 'direccion_sucursal',
        hidden: true
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'comuna',
        hidden: true
    },{
        header: "Ciudad",
        flex: 1,
        dataIndex: 'ciudad',
        hidden: true
    },{
        header: "Id_dpocuemnto",
        flex: 1,
        dataIndex: 'id_documento',
        hidden: true
    },{
        header: "Id_dpocuemnto",
        flex: 1,
        dataIndex: 'id_documento',
        hidden: true
    },{
        header: "Orden Compra",
        flex: 1,
        dataIndex: 'orden_compra',
        hidden: true
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'generarpago',
                text : 'Cancela Venta'
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'numberfield',
                itemId: 'recaudaId',
                fieldLabel: 'Recauda',
                readOnly: true,
                hidden :true
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'textfield',
                itemId: 'cajaId',
                fieldLabel: 'Caja',
                readOnly: true,
                hidden :true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'nomcajaId',
                fieldLabel: 'Caja',
                labelAlign: 'top',
                readOnly: true
            },{
                width: 100,
                xtype: 'textfield',
                itemId: 'cajeroId',
                fieldLabel: 'Cajero',
                readOnly: true,
                hidden: true
            },{
                width: 210,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'nomcajeroId',
                labelAlign: 'top',
                fieldLabel: 'Cajero',
                readOnly: true
            },{
                width: 110,
                xtype: 'numberfield',
                itemId: 'efectivonId',
                fieldLabel: 'Efectivo',
                hidden: true
            },{
                width: 70,
                xtype: 'numberfield',
                itemId: 'comprobanteId',
                fieldLabel: '',
                hidden: true
            },{
                xtype: 'textfield',
                fieldCls: 'required',
                width: 100,
                name : 'efectivo',
                itemId: 'efectivoId',
                readOnly: true,
                aling: 'center',
                fieldLabel: 'Efectivo',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(efectivo),"0.000")}

            },{
                width: 140,
                labelWidth: 50,
                xtype: 'numberfield',
                itemId: 'totchequesnId',
                fieldLabel: 'Cheques',
                hidden: true
            },{
                width: 100,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'totchequesId',
                fieldLabel: 'Cheques',
                name: 'cheques',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(cheques),"0,00")},
                readOnly: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'numberfield',
                itemId: 'otrosmontosnId',
                labelAlign: 'top',
                fieldLabel: 'Otros',
                hidden: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'otrosmontosId',
                labelAlign: 'top',
                name: 'otros',
                fieldLabel: 'Otros',
                renderer: function(valor){return Ext.util.Format.number(parseInt(otros),"0,00")},
                readOnly: true
            },{
                xtype: 'datefield',
                fieldCls: 'required',
                //maxHeight: 25,
                labelWidth: 60,
                labelAlign: 'top',
                width: 100,
                fieldLabel: '<b>Fecha</b>',
                itemId: 'fechaaperturaId',
                name: 'fecha_apertura'
            },'->',{
                width: 140,
                labelWidth: 55,
                xtype: 'textfield',
                itemId: 'nombresId',
                fieldLabel: 'Ticket'
            },{
                xtype: 'button',
                width: 80,
                iconCls: 'icon-search',
                action: 'generaticket',
                text : 'PAGAR'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcajaventa',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Preventa',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
