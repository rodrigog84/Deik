Ext.define('Infosys_web.view.tipo_documento_compras.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.tipodocumentoingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Tipos de Documentos Compras',
    layout: 'fit',
    autoShow: true,
    width: 280,
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
                        xtype: 'textfield',
                        name : 'nombre',
                        fieldLabel: 'Descripcion'
                    }]
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
