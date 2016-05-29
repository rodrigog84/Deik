Ext.define('Infosys_web.view.Preventa.IngresarClientes', {
    extend: 'Ext.window.Window',
    alias : 'widget.clientesingresarpreventa',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Clientes',
    layout: 'fit',
    autoShow: true,
    width: 1150,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {

        this.items = [
            {
                xtype: 'form',
                padding: '0 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    //anchor: '100%',
                    labelAlign: 'center',
                    combineErrors: true,
                    labelWidth: 90,
                    msgTarget: 'side'
                },

                items: [
                      {
                    xtype: 'fieldset', 
                    height: 50,
                    title: 'Ingreso de Datos',
                    items: [{
                      xtype: 'container',
                      layout: {
                          type: 'vbox'
                      },
                      defaults: {
                          flex: 1
                      },
                      items: [{
                        xtype: 'fieldcontainer',
                        height: 50,
                        layout: 'hbox',
                        items: [{
                            msgTarget: 'side',
                            fieldCls: 'required',
                            fieldLabel: '<b>RUT</b>',
                            xtype: 'textfield',
                            width: 250,
                            name : 'rut',
                            itemId: 'rutId',
                            readOnly: true
                 
                        },{xtype: 'splitter'},{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            name : 'nombres',
                            itemId: 'nombre_id',
                            fieldLabel: '<b>Razon Social</b>',
                            width: 780,
                            allowBlank: false
                    },{
                        xtype: 'textfield',
                        name : 'id',
                        itemId: 'id_cliente',
                        fieldLabel: 'id',
                        hidden:true
                    }]
                    },]
                    }]
                    },{
                    xtype: 'fieldcontainer',
                    height: 50,
                    layout: 'hbox',
                    anchor: '100%',
                    items: [{
                        xtype: 'textfield',
                        name : 'direccion',
                        itemId: 'direccionId',
                        width: 417,
                        fieldLabel: 'Direccion',
                        allowBlank: false
                    },{xtype: 'splitter'}, {
                        xtype: 'combo',
                        itemId: 'tipoCiudadId',
                        fieldLabel: 'Ciudad',
                        name: 'id_ciudad',
                        store: 'TipoCiudades',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                         anchor: '65%',
                         listConfig: {
                            minWidth: 450
                        }
                        
                    },{xtype: 'splitter'},{
                        xtype: 'combo',
                        itemId: 'tipoComunaId',
                        fieldLabel: 'Comuna',
                        name: 'id_comuna',
                        store: 'TipoComunas',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        anchor: '65%',
                        listConfig: {
                            minWidth: 450
                        }
                        
                    }
                    ,]
                    },{
                    xtype: 'fieldcontainer',
                    height: 50,
                    layout: 'hbox',
                    anchor: '100%',
                    items: [{
                        xtype: 'combo',
                        itemId: 'giroId',
                        fieldLabel: 'Giro',
                        name: 'id_giro',
                        store: 'Cod_activ',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        listConfig: {
                            minWidth: 450
                        },
                        width: 480
                        
                    },{xtype: 'splitter'},{
                        xtype: 'textfield',
                        name : 'fono',
                        itemId: 'fonoId',
                        width: 210,
                        fieldLabel: 'Telefono',
                        allowBlank: true
                    },{xtype: 'splitter'},{
                        xtype: 'textfield',
                        name : 'e_mail',
                        width: 350,
                        itemId: 'e_mailId',
                        fieldLabel: 'E-Mail',
                        allowBlank: true
                    },]
                    },{
                    xtype: 'fieldcontainer',
                    height: 50,
                    layout: 'hbox',
                    anchor: '100%',
                    items: [{
                        xtype: 'combo',
                        itemId: 'tipoVendedorId',
                        fieldLabel: 'Vendedor',
                        width: 350,
                        name: 'id_vendedor',
                        store: 'Vendedores',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                        
                    },{xtype: 'splitter'},{
                        xtype: 'numberfield',
                        name : 'descuento',
                        width: 160,
                        itemId: 'descuentoId',
                        fieldLabel: 'Descuento',
                        allowBlank: false
                    },{xtype: 'splitter'},{
                        xtype: 'combo',
                        itemId: 'tipopagoId',
                        anchor: '55%',
                        fieldLabel: 'Condicion',
                        forceSelection : true,
                        editable : false,
                        name : 'id_pago',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'Cond_pago',
                        allowBlank: false
                    },{xtype: 'splitter'},{
                        xtype: 'numberfield',
                        name : 'cupo_disponible',
                        width: 180,
                        itemId: 'disponibleId',
                        fieldLabel: 'Cupo Dispon.',
                        allowBlank: false
                    },{xtype: 'splitter'},{
                        xtype: 'numberfield',
                        name : 'imp_adicional',
                        width: 150,
                        itemId: 'impuestoId',
                        fieldLabel: 'Imp.Adicional',
                        allowBlank: false
                    },]
                    },{
                    xtype: 'fieldcontainer',
                    height: 50,
                    layout: 'hbox',
                    anchor: '100%',
                    items: [{
                        xtype: 'datefield',
                        name : 'fecha_incripcion',
                        fieldLabel: 'Fecha Incorporacion',
                        itemId: 'fecha_incripcionId',
                        value: new Date(),
                        format: 'd-m-Y',
                        anchor: '65%',
                        allowBlank: true
                     
                    },{xtype: 'splitter'},{
                        xtype: 'datefield',
                        name : 'fecha_ult_actualiz',
                        itemId: 'fecha_ult_actualizId',
                        value: new Date(),
                        fieldLabel: 'Fecha Ultima Actualizacion',
                        anchor: '65%',
                        allowBlank: true,
                        format: 'd-m-Y'
                    },{xtype: 'splitter'},{
                        xtype: 'combo',
                        itemId: 'tipoEstadoId',
                        anchor: '65%',
                        fieldLabel: 'Estado         ',
                        forceSelection : true,
                        editable : false,
                        name : 'estado',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'clientes.Activo',
                        allowBlank: false
                    },,]
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
                action: 'grabarclientespreventa'
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
