Ext.define('Infosys_web.view.facturaelectronica.ParamGeneralesFe' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.paramgeneralesfe',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Par&aacute;metros Generales Facturaci&oacute;n Electr&oacute;nica',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,
    initComponent: function() {
        me = this;
         var envio_sii = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'manual', "nombre":"Manual"},
                {"value":'automatico', "nombre":"Automático"}
            ]
        });

        response_param_fe = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/busca_parametro_fe/envio_sii'});
        var obj_param_fe_envio = Ext.decode(response_param_fe.responseText);

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: true,
                style: 'background-color: #fff;',
                items: [
                    {
                            xtype: 'combobox',
                            width: 500,
                            store : envio_sii,
                            fieldLabel: 'Env&iacute;o a SII',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'envio_sii' ,
                            name : 'envio_sii' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value',
                            value :  obj_param_fe_envio                           

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-save',
                            text: 'Guardar',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/set_parametro_fe',
                                        waitMsg: 'Guardando Par&aacute;metros...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        }]
                    }
                ]
            }
        ];
        
        this.callParent(arguments);
    }
});
