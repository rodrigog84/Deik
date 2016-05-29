Ext.define('Infosys_web.view.Login', {
    extend: 'Ext.container.Viewport',
    
    border: false,
    //style: 'background-size: 100% auto; background-image:url("resources/images/wall.jpg");',
    style: 'background-size: 100% auto; background-image:url("app/fondo.jpg");',
    
    layout: 'fit',
    id: 'widloginprin',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onViewportAfterRender: function(component, eOpts) {
        Ext.create('Infosys_web.view.WLogin').show()
    }
});