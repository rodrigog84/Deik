Ext.define('Infosys_web.controller.Tipo_movimientos', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Tipo_movimiento',
             'tipo_movimientos.Items',
             'tipo_movimientos.Selector',
             'cuentacontable.Items',
             'cuentascontable',
             'usuarios.Selector'
            ],

    models: ['Tipo_movimiento',
             'Tipo_movimientos.Item',
             'Cuentacontable.Item',
             'cuentascontable',
             'Usuario'],

    views: ['tipo_movimiento.Principal',
            'tipo_movimiento.Ingresar',
            'tipo_movimiento.Desplegar'

            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{    
            ref: 'tipomovimientoprincipal',
            selector: 'tipomovimientoprincipal'
        },{
            ref: 'tipomovimientoingresar',
            selector: 'tipomovimientoingresar'
        },{
            ref: 'topmenus',
            selector: 'topmenus'
        },{
            ref: 'panelprincipal',
            selector: 'panelprincipal'
        },{
            ref: 'tipomovimientodesplegar',
            selector: 'tipomovimientodesplegar'
        }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'topmenus menuitem[action=mtipomovimiento]': {
                click: this.mtipomovimiento
            },
            'tipomovimientoprincipal button[action=tipomovimiento]': {
                click: this.tipomovimiento
            },
            'tipomovimientoingresar button[action=tipomovimientograbar]': {
                click: this.tipomovimientograbar
            },
            'tipomovimientoprincipal button[action=tipomovimientocerrar]': {
                click: this.tipomovimientocerrar
            },
            'tipomovimientoprincipal button[action=buscartipomovimiento]': {
                click: this.buscartipomovimiento
            },
            'tipomovimientoprincipal button[action=editartipomovimientos]': {
                click: this.editartipomovimientos
            },
            'tipomovimientodesplegar button[action=tipomovimientograbareditar]': {
                click: this.tipomovimientograbareditar
            }

        });
    },

    tipomovimientograbareditar: function(){

        var win   = this.getTipomovimientodesplegar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

            var view = this.getTipomovimientoprincipal()

        
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }


        var st = this.getTipo_movimientoStore();
        
        var nuevo = false;

                
        if (values.id > 0){

               Ext.Ajax.request({
                    url: preurl + 'tipo_movimiento/update',
                    params: {

                      id : values.id,
                      id_tipo : values.id_tipo,
                      nombre : values.nombre,
                      id_cuenta : values.id_cuenta,
                      id_correccion : values.id_correccion,
                      id_orden_compra : values.id_orden_compra,
                      id_usuario : values.id_usuario,
                      id_estad_consumo : values.id_estad_consumo,
                      id_estad_compras : values.id_estad_compras,
                      id_rut : values.id_rut,
                      id_stock : values.id_stock
                     
                      
                    },
                    success: function(){
                        view.getStore().load();
                        st.load();
                    }
                   
                });
        } else{
            record = Ext.create('Infosys_web.model.Tipo_movimiento');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        view.getStore().sync({
            success: function(){
                view.getStore().load();
            }
        }

        );
    },

    editartipomovimientos: function(){
        
        var view = this.getTipomovimientoprincipal()
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.tipo_movimiento.Desplegar').show();
            edit.down('form').loadRecord(row);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    mtipomovimiento: function(){

       var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'tipomovimientoprincipal'});

    },

    buscartipomovimiento: function(){
        var view = this.getTipomovimientoprincipal()
        var st = this.getTipo_movimientoStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    tipomovimiento: function(){
        Ext.create('Infosys_web.view.tipo_movimiento.Ingresar').show();

    },
    
    tipomovimientograbar: function(){

        var win   = this.getTipomovimientoingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getTipo_movimientoStore();
        var bodega = view.down('#nombreId').getValue()

       
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }

         Ext.Ajax.request({
            url: preurl + 'tipo_movimiento/save',
            params: {
               
              id_tipo : values.id_tipo,
              nombre : values.nombre,
              id_cuenta : values.id_cuenta,
              id_correccion : values.id_correccion,
              id_orden_compra : values.id_orden_compra,
              id_usuario : values.id_usuario,
              id_estad_consumo : values.id_estad_consumo,
               id_estad_compras : values.id_estad_compras,
              id_rut : values.id_rut,
              id_stock : values.id_stock
             
            },
             success: function(response){
                 win.close();
                 st.load();
                 //stFactura.load();
            
            }
           
        });

              
    },

    tipomovimientocerrar: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

});

    









