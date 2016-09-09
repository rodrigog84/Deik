Ext.define('Infosys_web.controller.Precios', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Precios',
             'precios.Items',
             'Productosf'            
             ],

    models: ['Precios',
            'Precios.Item'
             ],

    views: ['precios.Principal',
            'precios.Subir',
            'precios.Ingreso',
            'precios.Eliminar'
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'preciosprincipal',
        selector: 'preciosprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'subirprecios',
        selector: 'subirprecios'
    },{
        ref: 'preciosingresar',
        selector: 'preciosingresar'
    },{
        ref: 'buscarproductosprecios',
        selector: 'buscarproductosprecios'
    },{
        ref: 'eliminar',
        selector: 'eliminar'
    }

  
    ],
    
    init: function() {
    	
        this.control({

            'topmenus menuitem[action=mprecios]': {
                click: this.mprecios
            },
            'panelprincipal menuitem[action=cerrarprecios]': {
                click: this.cerrarprecios
            },
            'preciosprincipal button[action=subirexcel]': {
                click: this.subirexcel
            },
            'preciosprincipal button[action=ingresar]': {
                click: this.ingresar
            },
            'subirprecios button[action=Subir]': {
                click: this.Subir
            },
            'preciosingresar button[action=agregarItem]': {
                click: this.agregarItem

            },
            'preciosingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'preciosingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'preciosingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductosprecios button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosprecios button[action=buscar]': {
                click: this.buscarp
            },
            'preciosingresar button[action=grabaringreso]': {
                click: this.grabaringreso
            },
            'preciosprincipal button[action=actualizar]': {
                click: this.actualizar
            },
            'eliminar button[action=actualizarprecios]': {
                click: this.actualizarprecios
            },
            'eliminar button[action=salirprecios]': {
                click: this.salirprecios
            },
            'preciosprincipal button[action=exportarexcelproductos]': {
                click: this.exportarexcelproductos
            },


            
        });
    },


    buscarp: function(){
        var view = this.getBuscarproductosprecios();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    exportarexcelproductos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPreciosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcellistaProductos?cols='+Ext.JSON.encode(jsonCol));
 
    },


    salirprecios: function(){

        var view = this.getEliminar();
        var st = this.getPreciosStore();
        Ext.Ajax.request({
            url: preurl + 'precios/borrar',
            params: {

                id: 1
                
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Eliminados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos No Actualizados');
                    return;
                     
                 };
                
        }
        });

    },


    actualizar: function(){

        Ext.create('Infosys_web.view.precios.Eliminar').show();
            
    },

    actualizarprecios: function() {

        var view = this.getEliminar();
        var st = this.getPreciosStore();
        Ext.Ajax.request({
            url: preurl + 'precios/actualiza',
            waitMsg: 'Actualizando...',
            params: {

                id: 1
                
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Actualizados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load();
                    Ext.Msg.alert('Datos No Actualizados');
                    return;
                     
                 };
                
        }
        });
        
              
    },

    grabaringreso: function() {

        var viewIngresa = this.getPreciosingresar();
        var numero = viewIngresa.down('#numeroId').getValue();
        var fecha = viewIngresa.down('#fechaId').getValue();
        var stItem = this.getPreciosItemsStore();
        var stPrecio = this.getPreciosStore();

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'precios/save',            
            params: {
                items: Ext.JSON.encode(dataItems),
                numero: numero,
                fecha : fecha
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                viewIngresa.close();
                stPrecio.load();
                
            }
           
        });        
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosprecios();
        var viewIngresa = this.getPreciosingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#nomproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#valorOriginalId').setValue(row.data.p_venta);
            viewIngresa.down('#stockId').setValue(row.data.stock);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    buscarproductos: function(){

        Ext.create('Infosys_web.view.precios.BuscarProductos').show();
    },

    eliminaritem: function() {
        var view = this.getPreciosingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarItem: function() {

        var view = this.getPreciosingresar();
        var stItem = this.getPreciosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nomproducto = view.down('#nomproductoId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var stock = view.down('#stockId').getValue();
        var precio_ori = view.down('#valorOriginalId').getValue();
        var precio_nue = view.down('#nuevovalorId').getValue();
        exists = 0;
        
        if(precio_nue==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        };

        if(!producto){
            Ext.Msg.alert('Alerta', 'Debe Selecionar Producto');
            return false;
        };

        stItem.each(function(r){
        if(r.data.id == producto){
            Ext.Msg.alert('Alerta', 'El registro ya existe.');
            exists = 1;
            cero="";
            view.down('#codigoId').setValue(cero);
            view.down('#productoId').setValue(cero);
            view.down('#stockId').setValue(cero);
            view.down('#nuevovalorId').setValue(cero);
            view.down('#valorOriginalId').setValue(cero);
            return; 
        }
        });

        if(exists == 1)
        return;

        console.log(precio_nue)

        stItem.add(new Infosys_web.model.Precios.Item({
            id: producto,
            idproducto: producto,
            codigo: codigo,
            nombre: nomproducto,
            stock: stock,
            p_venta: precio_ori,
            precionuevo: precio_nue  
        }));

        cero="";
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#stockId').setValue(cero);
        view.down('#nuevovalorId').setValue(cero);
        view.down('#valorOriginalId').setValue(cero);
        view.down("#buscarproc").focus();

        
    },

    ingresar: function(){

        nombre ="17";

        Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.precios.Ingreso').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numeroId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });
        

    },

    subirexcel: function(){

        nombre ="17";

        Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.precios.Subir').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numeroId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });
        

    },

    Subir : function(){

          var view = this.getSubirprecios();
          var stPrecio = this.getPreciosStore();            
          var form = view.down('form').getForm();
            if(form.isValid()){
                form.submit({
                    url:preurl + 'precios/rescatar',
                    waitMsg: 'Cargando Excel...',
                    success: function(success) {
                        Ext.Msg.alert('Atención', 'Subio Correctamente');
                        view.close();
                        stPrecio.load();

                    }
                });
            }
    }, 
    
    
    buscar: function(){

        var view = this.getBuscarclientesnotaventa();
        var st = this.getClientesStore();
        var rut = view.down('#rutId').getValue();
        var nombre = view.down('#nombreId').getValue();

        if (!rut){            
             var opcion = "Nombre";
        };
      
        if (!nombre){
            var opcion = "Rut";
            var nombre = view.down('#rutId').getValue();
        };

        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    mprecios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'preciosprincipal'});
    }, 
    
    cerrarprecios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










