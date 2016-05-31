Ext.define('Infosys_web.view.facturaelectronica.CargaListaContribuyentes', {
    extend: 'Ext.window.Window',
    alias : 'widget.cargalistacontribuyentes',

    requires: ['Ext.form.Panel','Ext.form.field.Text','Ext.toolbar.Paging'],

    title : 'Carga Listado de Contribuyentes',
    autoShow: true,
    width: 600,
    modal: true,
    iconCls: 'icon-sheet',
    bodyPadding: 7,
    initComponent: function() {
        var me = this;

       
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
                            xtype: 'filefield',
                            id: 'form-file',
                            width: 500,
                            emptyText: 'Base .csv',
                            fieldLabel: 'Archivo de Carga',
                            labelStyle: ' font-weight:bold',
                            name: 'csv',
                            allowBlank : false,
                            buttonText: 'Examinar',
                            listeners:{
                                afterrender:function(cmp){
                                  cmp.fileInputEl.set({
                                    accept:'.csv' // or w/e type
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
                action: 'cargar_listado_contribuyentes',
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
