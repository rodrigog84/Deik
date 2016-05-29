Ext.define('Infosys_web.view.agrupaciones.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.agrupacionesingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Agrupaciones',
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
                    allowBlank: false,
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
                    },
                    {
                        xtype: 'textfield',
                        name : 'codigo',
                        fieldLabel: 'codigo'
                    },    
                    {
                        xtype: 'textfield',
                        name : 'nombre',
                        fieldLabel: 'Nombre Agrupacion'
                    },{

                        xtype: 'combo',
                        align: 'center',
                        itemId: 'tipofamiliaId',
                        fieldLabel: 'Familias',
                        name: 'id_familia',
                        store: 'Familias',
                        queryMode: 'local',
                        anchor: '65%',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        listConfig: {
                            minWidth: 250
                        }, 
                        width: 180,
                        allowBlank: false
                    },{

                        xtype: 'combo',
                        align: 'center',
                        itemId: 'tiposubfamiliaId',
                        fieldLabel: 'Sub Familia',
                        name: 'id_subfamilia',
                        store: 'Subfamilia',
                        queryMode: 'local',
                        anchor: '65%',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        listConfig: {
                            minWidth: 250
                        }, 
                        width: 180,
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
                action: 'grabaragrupaciones'
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
