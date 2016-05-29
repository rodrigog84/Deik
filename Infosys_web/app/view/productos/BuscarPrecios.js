Ext.define('Infosys_web.view.productos.BuscarPrecios' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarpreciosproductos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Lista de Precios',
    layout: 'fit',
    autoShow: true,
    width: 600,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',
            itemId: 'itemsgridId',
            title : 'Precios Descuentos',
            store: 'Preciosdescuentos',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                width: 100,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Id",
                width: 100,
                dataIndex: 'id_producto',
                hidden: true
            },{
                header: "Nombres",
                width: 340,
                dataIndex: 'nombre'
            },{
                header: "Valor",
                width: 100,
                dataIndex: 'valor',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 540,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            }
            ]      
            },{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 300,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'Id',
                name: 'id',
                fieldLabel: 'Id',
                hidden: true
            },{
                width: 50,
                labelWidth: 10,
                xtype: 'textfield',
                itemId: 'Idproducto',
                name: 'id_producto',
                fieldLabel: 'Id',
                hidden: true
            },{
                width: 300,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'motivoId',
                name: 'motivo',
                fieldLabel: 'Motivo'
            },{xtype: 'splitter'},{
                width: 155,
                labelWidth: 50,
                xtype: 'numberfield',
                itemId: 'valorId',
                name : 'valor',
                fieldLabel: 'Precio'
            },{xtype: 'splitter'},{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarprecios',
                text : 'Agregar'
            }
            ]      
            },{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarprecios',
                text : 'Eliminar'
            },{xtype: 'splitter'},{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'modificarprecios',
                text : 'Modificar'
            },'->',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarprecios'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }
            ]      
            }];

        
        this.callParent(arguments);
    }
});
