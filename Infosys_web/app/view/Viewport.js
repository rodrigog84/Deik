Ext.define('Infosys_web.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewportgnrl',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Infosys_web.view.Login'
    ],

    layout: 'border',
    items: [{
        region: 'north',
        height: 85,
        html: '<div style="background-color: #000000; WIDTH: 100%; HEIGHT: 80px"><img height="80px" src="app/baner4.jpg" align="middle" /></div>' 
    },{
            region: 'center',
            xtype: 'panel',
            itemId: 'panelviewportid',
            layout: 'fit',
            items:[{
                xtype: 'panelprincipal',
                id: 'panelprincipal_id',
                layout: 'fit',
                height: '100%'
            }]
        }

    ]
});
