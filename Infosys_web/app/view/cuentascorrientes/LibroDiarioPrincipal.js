Ext.define('Infosys_web.view.cuentascorrientes.LibroDiarioPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.librodiarioprincipal',

    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Libro Diario',
    store: 'cuentacorriente.Librodiario',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{         
        header: "Tipo Comprobante",
        flex: 1,
        dataIndex: 'tipocomprobante'
    },{         
        header: "Nro. Comprobante",
        flex: 1,
        dataIndex: 'nrocomprobante'
    },{         
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },{         
        header: "Cuenta Contable",
        flex: 1,
        dataIndex: 'cuentacontable'
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut'
    },{
        header: "Documento",
        flex: 1,
        dataIndex: 'documento'
    },{
        header: "Fecha Vencimiento",
        flex: 1,
        dataIndex: 'fechavencimiento'
    },{
        header: "Cargos",
        flex: 1,
        dataIndex: 'cargos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "Abonos",
        flex: 1,
        dataIndex: 'abonos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'

    }],
    
    initComponent: function() {
        var me = this;

       /* var comprobantes = Ext.create('Ext.data.Store', {
            fields: ['id', 'numcomprobante'],
            proxy: {
              type: 'ajax',
                actionMethods:  {
                    read: 'POST'
                 },              
                url : preurl +'cuentacorriente/getComprobantes',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true            
        });      */

         var comprobantes = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":"CANCELACION", "nombre":"CANCELACION"},
                {"value":"DEPOSITO", "nombre":"DEPOSITO"},
                {"value":"OTRO", "nombre":"OTROS INGRESOS"},
                {"value":"TODOS", "nombre":"TODOS"}
            ]
        });


        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                            xtype: 'datefield',
                            fieldLabel: '<b>Fecha Desde:</b>',
                            width: 250,
                            name: 'fecdesde',
                            itemId: 'fecdesdeId',
                            value: new Date(),
                            format: 'Y-m-d'
                            /*,
                            listeners: {
                                select: function (df,newvalue,opts) {
                                    fecdesde = newvalue;
                                    fechasta = me.down('#fechastaId').getValue();                                    

                                    comprobantes.proxy.extraParams = {
                                            fecdesde: fecdesde,
                                            fechasta: fechasta                                                                            
                                                                            }
                                    comprobantes.load();
                                }
                            }      */                      
            },{
                            xtype: 'datefield',
                            fieldLabel: '<b>Fecha Hasta:</b>',
                            width: 250,
                            name: 'fechasta',
                            itemId: 'fechastaId',
                            value: new Date(),
                            format: 'Y-m-d'
                            /*,
                            listeners: {
                                select: function (df,newvalue,opts) {

                                    fecdesde = me.down('#fecdesdeId').getValue();
                                    fechasta = newvalue;

                                    comprobantes.proxy.extraParams = {
                                            fecdesde: fecdesde,
                                            fechasta: fechasta                                                                            
                                                                            }
                                    comprobantes.load();
                                }
                            }  */
            },{
                            xtype: 'combo',
                            fieldLabel: '<b>Tipo Comprobante:</b>',
                            displayField: 'nombre',
                            valueField: 'value',
                            triggerAction: 'all',
                            selectOnTab: true,
                            editable: false,
                            queryMode: 'remote',
                            store: comprobantes,
                            itemId: 'comprobanteId',
                            value : 'TODOS',
                            listConfig: {
                                    width :  300,
                                    minWidth : 300
                            }
            },{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarlibrodiario',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarlibrodiario'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'generarlibrodiariopdf'
            },'->',{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpantalla',
                text : 'Cerrar'                        
            }
            ]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'cuentacorriente.Librodiario',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }
});
