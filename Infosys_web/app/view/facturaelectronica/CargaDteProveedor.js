Ext.define('Infosys_web.view.facturaelectronica.CargaDteProveedor', {
    extend: 'Ext.window.Window',
    alias : 'widget.cargadteproveedor',

    requires: ['Ext.form.Panel','Ext.form.field.Text','Ext.toolbar.Paging'],

    title : 'Carga de DTE',
    autoShow: true,
    width: 600,
    modal: true,
    iconCls: 'icon-sheet',
    bodyPadding: 7,
    initComponent: function() {
        var me = this;

         var proveedores_mail = Ext.create('Ext.data.Store', {
            fields: ['id', 'proveedor'],
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/get_proveedores_mail',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });   

         var cuentasDocumentos = Ext.create('Ext.data.Store', {
            fields: ['id', 'nombre', 'saldo', 'documento'],
            proxy: {
              type: 'ajax',
                actionMethods:  {
                    read: 'POST'
                 },              
                url : preurl +'cuentacorriente/getDocumentosByCtacte',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true            
        });              
       
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                labelWidth: 150,
                border: false,
                style: 'background-color: #fff;',
                items: [
                   {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 150,
                        items: [{
                           xtype: 'combobox',
                            queryMode: 'local',
                             width: 500,
                            fieldLabel: 'Proveedor',
                            store : proveedores_mail,
                            labelStyle: ' font-weight:bold',
                            displayField : 'proveedor',
                            valueField : 'id',                                    
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'proveedores' ,
                            name : 'proveedores' ,
                            forceSelection: true, 
                            allowBlank : false, 
                            listConfig: {
                                minWidth: 280
                            },
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 150,
                        items: [{
                            xtype: 'filefield',
                            id: 'form-file',
                            width: 500,
                            emptyText: 'DTE .xml',
                            fieldLabel: 'DTE',
                            labelStyle: ' font-weight:bold',
                            name: 'dte',
                            allowBlank : false,
                            buttonText: 'Examinar',
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.xml' // or w/e type
                                  });
                                }
                            }              
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
                iconCls: 'icon-upload',
                text: 'Cargar',
                action: 'cargar_dte_provee',
               /* handler: function() {
                    console.log(this);
                    var form = this.down('form').getForm();
                    if(form.isValid()){
                        form.submit({
                            url: preurl + 'facturas/cargadteprovee',
                            waitMsg: 'Cargando DTE...',
                            success: function(fp, o) {

                                Ext.Msg.alert('Atención', o.result.message);

                            }
                        });
                    }
                }    */              
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
