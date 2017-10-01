Ext.define('Infosys_web.controller.ExistenciasClientes', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['ExistenciasClientes',
             'Clientes'
             ],

    models: ['existenciasclientes',
              ],

    views: ['existencia.PrincipalClientes',
            'existencia.BuscarClientes'
             ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'existenciaprincipalclientes',
        selector: 'existenciaprincipalclientes'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'buscarclientesexistencia',
        selector: 'buscarclientesexistencia'
    }



    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mexistenciaclientes]': {
                click: this.mexistenciaclientes
            },
            'existenciaprincipalclientes button[action=buscarexistencia]': {
                click: this.buscarexistencia
            },
            'existenciaprincipalclientes button[action=cerrarexistencia]': {
                click: this.cerrarexistencia
            },
            'existenciaprincipalclientes button[action=exportarexcelexistenciaclientes]': {
                click: this.exportarexcelexistenciaclientes
            },
            'existenciaprincipalclientes button[action=editarexistencia]': {
                click: this.editarexistencia
            },
            'existenciaprincipalclientes button[action=actualizatabla]': {
                click: this.actualizatabla
            },
            'buscarclientesexistencia button[action=buscarexistenciacliente]': {
                 click: this.buscarexistenciacliente                
            },
            'buscarclientesexistencia button[action=seleccionarexitenciacliente]': {
                 click: this.seleccionarexitenciacliente
                
            },
           
        });
    },

    buscarexistenciacliente: function(){       
        var view = this.getBuscarclientesexistencia()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        var rut = view.down('#rutId').getValue()
        if(rut){
            var opcion = "Rut";
            var nombre = rut;
        }else if(nombre){
            var opcion = "Nombre";
        };

        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();  

    },


    seleccionarexitenciacliente: function(){

        var view = this.getBuscarclientesexistencia();
        var viewIngresa = this.getExistenciaprincipalclientes();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#razonidd').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rutaut);
            view.close();         
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },



    actualizatabla: function(){

        var view = this.getExistenciaprincipalclientes();
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Actualizando..."});
        myMask.show();
        Ext.Ajax.request({
        url: preurl + 'existenciasclientes/save',
        params: {
            id:1        
        },
        success: function(response, opts) {             
            myMask.hide();
            Ext.Msg.alert('Informacion', 'Actualizacion Correcta');
            view.close();             

        },
            failure: function(response, opts) {
            myMask.hide();
            console.log('server-side failure with status code ' + response.status);
        }
        });  

           
    },

    editarexistencia: function(){

        var view = this.getExistenciaprincipalclientes();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.existencia.detalle_existencias').show();
            var nombre = (row.get('id_producto'));
            var stock = (row.get('stock'));
            edit.down('#productoId').setValue(nombre);
            edit.down('#stockId').setValue(stock);
            var st = this.getExistencias2Store()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    cerrarexistencia: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mexistenciaclientes: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var stItms = Ext.getStore('ExistenciasClientes');
        stItms.removeAll();
        viewport.add({xtype: 'existenciaprincipalclientes'});
    },

    exportarexcelexistenciaclientes: function(){

        var jsonCol = new Array()
        var i = 0;
        var grid =this.getExistenciaprincipalclientes()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarexcelexistenciaclientes?cols='+Ext.JSON.encode(jsonCol));

   },

    exportarexcelexistenciaclientesdetalle: function(){

        var view =this.getDetalleexistencias()
        var idproducto = view.down('#productoId').getValue()
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getDetalleexistencias()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarexcelexistenciaclientesdetalle?idproducto='+idproducto+'&cols='+Ext.JSON.encode(jsonCol));
         view.close();

   },

    buscarexistencia: function(){

        var view = this.getExistenciaprincipalclientes()
        var st = this.getExistenciasClientesStore()
        var nombre = view.down('#nombreId').getValue()
        var rut = view.down('#rutId').getValue()

        if (rut){
        st.proxy.extraParams = {nombre : nombre,
                                rut : rut}
        st.load();
        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#razonidd").setValue(cliente.nombres)
                    }
                    
                }
            }

        }); 
   }else{
        var edit = Ext.create('Infosys_web.view.existencia.BuscarClientes'); 
   }; 

},
     
  
});










