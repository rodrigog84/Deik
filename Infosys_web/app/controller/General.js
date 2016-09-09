Ext.define('Infosys_web.controller.General', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: [
              'ciudades.Items',
              'Marcas',
              'comunas.Items',
              'vendedores.Items',
              'Ciudad',
              'Usuario',
              'Login',
              'Comuna',
              'Ubicaciones',
              'Medidas',
              'TipoCiudades',
              'TipoComunas',
              'usuarios.Selector',
              'Vendedores',
              'Familias',
              'Bodegas',
              'Agrupacion',
              'Subfamilia',
              'cod_activ_econ.Items',
              'Cod_activ_eco',
              'bancos.Items',
              'cajeros.Items',
              'Cajeros',
              'cajas.Items',
              'Cajas',
              'Banco',
              'cond_pagos.Items',
              'Cond_pago',
              'sucursales.Items',
              'Sucursal',
              'plazas.Items',
              'Plaza',
              'vendedores.Activo',
              'Tabladescuento'
              ],

    models: [
              'Ciudades.Item',
              'Usuarios.Item',
              'Comunas.Item',
              'marcas',
              'Vendedores.Item',
              'Ciudad',
              'Cajas.Item',
              'Caja',
              'Cajero.Item',
              'Cajero',
              'Ubica',
              'Medida',
              'Login',
              'Usuario',
              'Comuna',
              'Vendedor',
              'TipoEstado',
              'TipoCiudad',
              'TipoComuna',
              'Familia',
              'Bodega',
              'Agrupaciones',
              'Subfamilias',
              'Cod_activ_econ.Item',
              'Cod_activ_eco',
              'Bancos.Item',
              'Banco',
              'Cond_pago.Item',
              'Cond_pag',
              'Sucursales.Item',
              'Sucursal',
              'Plazas.Item',
              'Plaza',
              'Tabladescuento'
              ],

    views: [
        'Main',
        'TopMenus',
        'Login',
        'cajeros.BuscarCajeros',
        'cajeros.BusquedaCajeros',
        'cajeros.Ingresar',
        'cajeros.Principal',
        'cajas.BusquedaCajas',
        'cajas.Ingresar',
        'cajas.Principal',
        'ciudades.Principal',
        'ciudades.Ingresar',
        'ubicaciones.Principal',
        'ubicaciones.Ingresar',
        'ubicaciones.BusquedaUbicaciones',
        'medidas.Principal',
        'medidas.Ingresar',
        'medidas.BusquedaMedidas',
        'ciudades.BusquedaCiudades',
        'comunas.Principal',
        'comunas.Ingresar',
        'vendedores.Ingresar',
        'vendedores.BusquedaVendedores',
        'vendedores.Principal',
        'ventas.Ejemplo',
        'familias.BusquedaFamilias',
        'familias.Ingresar',
        'familias.Principal',
        'bodegas.Ingresar',
        'marcas.Ingresar',
        'marcas.Principal',
        'bodegas.Principal',
        'bodegas.BuscarBodegas',
        'agrupaciones.BuscarAgrupaciones',
        'agrupaciones.Ingresar',
        'agrupaciones.Principal',
        'subfamilias.BuscarSubfamilias',
        'subfamilias.Ingresar',
        'subfamilias.Principal',
        'movimiento_diario_inventario.Ingresar',
        'cod_activ_econ.BusquedaCod_activ_econ',
        'cod_activ_econ.Ingresar',
        'cod_activ_econ.Principal',
        'bancos.BusquedaBancos',
        'bancos.Ingresar',
        'bancos.Principal',
        'cond_pagos.BusquedaCondicionesdepagos',
        'cond_pagos.Ingresar',
        'cond_pagos.Principal',
        'sucursales.BusquedaSucursales',
        'sucursales.Ingresar',
        'sucursales.Principal',
        'plazas.BusquedaPlazas',
        'plazas.Ingresar',
        'plazas.Principal',
        'cuentascorrientes.CancelacionesPrincipal',
        'cuentascorrientes.OtrosingresosPrincipal',
        'cuentascorrientes.CartolaPrincipal',
        'cuentascorrientes.CreacionCuentasPrincipal',
        'cuentascorrientes.ResumenMovimientoPrincipal',
        'cuentascorrientes.LibroDiarioPrincipal',
        'cuentascorrientes.SaldoDocumentosPrincipal',
        'Tabladescuento.Ingresar',
        'Tabladescuento.Principal'
         ],
    
    
    refs: [{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'login',
        selector: 'login'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'ciudadesingresar',
        selector: 'ciudadesingresar'
    },{
        ref: 'comunasingresar',
        selector: 'comunasingresar'
    },{
        ref: 'ciudadesprincipal',
        selector: 'ciudadesprincipal'
    },{
        ref: 'comunasprincipal',
        selector: 'comunasprincipal'
    },{
        ref: 'usuariosingresar',
        selector: 'usuariosingresar'
    },{
        ref: 'usuariosprincipal',
        selector: 'usuariosprincipal'
    },{
        ref: 'ubicacionesingresar',
        selector: 'ubicacionesingresar'
    },{
        ref: 'medidasprincipal',
        selector: 'medidasprincipal'
    },{
        ref: 'medidasingresar',
        selector: 'medidasingresar'
    },{
        ref: 'ubicacionesprincipal',
        selector: 'ubicacionesprincipal'
    },{
        ref: 'vendedoresingresar',
        selector: 'vendedoresingresar'
    },{
        ref: 'vendedoresprincipal',
        selector: 'vendedoresprincipal'
    },{
        ref: 'familiasingresar',
        selector: 'familiasingresar'
    },{
        ref: 'familiasprincipal',
        selector: 'familiasprincipal'
    },{
        ref: 'bodegasingresar',
        selector: 'bodegasingresar'
    },{
        ref: 'bodegasprincipal',
        selector: 'bodegasprincipal'
    },{
        ref: 'marcasingresar',
        selector: 'marcasingresar'
    },{
        ref: 'marcasprincipal',
        selector: 'marcasprincipal'
    },{
        ref: 'agrupacionesingresar',
        selector: 'agrupacionesingresar'
    },{
        ref: 'agrupacionesprincipal',
        selector: 'agrupacionesprincipal'
    },{
        ref: 'subfamiliasingresar',
        selector: 'subfamiliasingresar'
    },{
        ref: 'subfamiliasprincipal',
        selector: 'subfamiliasprincipal'
    },{
        ref: 'codactiveconingresar',
        selector: 'codactiveconingresar'
    },{
        ref: 'codactiveconprincipal',
        selector: 'codactiveconprincipal'
    },{
        ref: 'bancosprincipal',
        selector: 'bancosprincipal'
    },{
        ref: 'bancosingresar',
        selector: 'bancosingresar'
    },{
        ref: 'condicionesdepagosprincipal',
        selector: 'condicionesdepagosprincipal'
    },{
        ref: 'condicionesdepagosingresar',
        selector: 'condicionesdepagosingresar'
    },{
        ref: 'sucursalesingresar',
        selector: 'sucursalesingresar'
    },{
        ref: 'sucursalesprincipal',
        selector: 'sucursalesprincipal'
    },{
        ref: 'plazasingresar',
        selector: 'plazasingresar'
    },{
        ref: 'plazasprincipal',
        selector: 'plazasprincipal'
    },{
        ref: 'cajerosingresar',
        selector: 'cajerosingresar'
    },{
        ref: 'cajerosprincipal',
        selector: 'cajerosprincipal'
    },{
        ref: 'cajasingresar',
        selector: 'cajasingresar'
    },{
        ref: 'cajasprincipal',
        selector: 'cajasprincipal'
    },{
        ref: 'cancelacionesprincipal',
        selector: 'cancelacionesprincipal'
    },{
        ref: 'otrosingresosprincipal',
        selector: 'otrosingresosprincipal'
    },{
        ref: 'cartolaprincipal',
        selector: 'cartolaprincipal'
    },{
        ref: 'creacioncuentasprincipal',
        selector: 'creacioncuentasprincipal'
    },{
        ref: 'resumenmovimientoprincipal',
        selector: 'resumenmovimientoprincipal'
    },{
        ref: 'librodiarioprincipal',
        selector: 'librodiarioprincipal'
    },{
        ref: 'saldodocumentosprincipal',
        selector: 'saldodocumentosprincipal'
    },{
        ref: 'productosprincipal',
        selector: 'productosprincipal'
    },{
        ref: 'tablaprincipal',
        selector: 'tablaprincipal'
    },{
        ref: 'tablaingresar',
        selector: 'tablaingresar'
    },{
        ref: 'vendedoreseditar',
        selector: 'vendedoreseditar'
    },{
        ref: 'cambiopassword',
        selector: 'cambiopassword'
    }
    ],


    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
        //el <<control>> es el puente entre la vista y funciones internas
        //del controller
        this.control({

            'login button[action=login]': {
                click: this.login
            },

            'login #enterId': {
                specialkey: this.special
            },

            'login #enter2Id': {
                specialkey: this.special2
            },

            'topmenus menuitem[action=mclientes]': {
                click: this.mclientes
            },
            'topmenus menuitem[action=musuarios]': {
                click: this.musuarios
            },
            'topmenus menuitem[action=mroles]': {
                click: this.mroles
            },     
            'topmenus menuitem[action=mproductos]': {
                click: this.mproductos
            },
            'topmenus menuitem[action=mejemplos]': {
                click: this.mejemplos
            },
            'topmenus menuitem[action=mvendedores]': {
                click: this.mvendedores
            },
            'topmenus menuitem[action=mcajeros]': {
                click: this.mcajeros
            },
            'topmenus menuitem[action=mtablas]': {
                click: this.mtablas
            },
            'topmenus menuitem[action=mcajas]': {
                click: this.mcajas
            },
            'topmenus menuitem[action=mubica]': {
                click: this.mubica
            },            
            'topmenus menuitem[action=mmedidas]': {
                click: this.mmedidas
            },            
            'topmenus menuitem[action=mciudades]': {
                click: this.mciudades
            },            
            'topmenus menuitem[action=mcomunas]': {
                click: this.mcomunas
            },
            'topmenus menuitem[action=mfamilias]': {
                click: this.mfamilias
            },
            'topmenus menuitem[action=mbodegas]': {
                click: this.mbodegas
            },
            'topmenus menuitem[action=mmarcas]': {
                click: this.mmarcas
            },
            'topmenus menuitem[action=magrupaciones]': {
                click: this.magrupaciones
            },
            'topmenus menuitem[action=msubfamilias]': {
                click: this.msubfamilias
            },
            'topmenus menuitem[action=msubfamilias]': {
                click: this.msubfamilias
            },
            'topmenus menuitem[action=mcodactivecon]': {
                click: this.mcodactivecon
            },
            'topmenus menuitem[action=mbancos]': {
                click: this.mbancos
            },
            'topmenus menuitem[action=mcondicionpagos]': {
                click: this.mcondicionpagos
            },
            'topmenus menuitem[action=msucursales]': {
                click: this.msucursales
            },
            'topmenus menuitem[action=mplazas]': {
                click: this.mplazas
            },
            'topmenus menuitem[action=cc_tg_creacioncuentas]': {
                click: this.cc_tg_creacioncuentas
            },             
            'topmenus menuitem[action=cc_md_mcancelaciones]': {
                click: this.cc_md_mcancelaciones
            }, 
            'topmenus menuitem[action=cc_md_oingresos]': {
                click: this.cc_md_oingresos
            }, 
            'topmenus menuitem[action=cc_md_resmovimiento]': {
                click: this.cc_md_resmovimiento
            },  
            'topmenus menuitem[action=cc_md_librodiario]': {
                click: this.cc_md_librodiario
            },                         
            'topmenus menuitem[action=cc_rep_cartola]': {
                click: this.cc_rep_cartola
            }, 

            'topmenus menuitem[action=cc_rep_saldosdocumentos]': {
                click: this.cc_rep_saldosdocumentos
            }, 

            'ubicacionesprincipal button[action=buscarubicacion]': {
                click: this.buscarubicacion
            },
            'ubicacionesingresar button[action=grabarubicaciones]': {
                click: this.grabarubicaciones
            },
            'ubicacionesprincipal button[action=agregarubicaciones]': {
                click: this.agregarubicaciones
            },
            'ubicacionesprincipal button[action=editarubicaciones]': {
                click: this.editarubicaciones
            },
            'medidasprincipal button[action=buscarmedidas]': {
                click: this.buscarmedidas
            },
            'medidasingresar button[action=grabarmedidas]': {
                click: this.grabarmedidas
            },
            'medidasprincipal button[action=agregarmedidas]': {
                click: this.agregarmedidas
            },
            'medidasprincipal button[action=editarmedidas]': {
                click: this.editarmedidas
            },
            'ciudadesprincipal button[action=buscarciudades]': {
                click: this.buscarciudades
            },
            'ciudadesingresar button[action=grabarciudades]': {
                click: this.grabarciudades
            },
            'ciudadesprincipal button[action=agregarciudades]': {
                click: this.agregarciudades
            },
            'ciudadesprincipal button[action=editarciudades]': {
                click: this.editarciudades
            },
            'usuariosprincipal button[action=buscarusuarios]': {
                click: this.buscarusuarios
            },
            'usuariosingresar button[action=grabarusuarios]': {
                click: this.grabarusuarios
            },
            'usuariosprincipal button[action=agregarusuarios]': {
                click: this.agregarusuarios
            },
            'usuariosprincipal button[action=editarusuarios]': {
                click: this.editarusuarios
            },
            'comunasprincipal button[action=buscarcomunas]': {
                click: this.buscarcomunas
            },
            'comunasingresar button[action=grabarcomunas]': {
                click: this.grabarcomunas
            },
            'comunasprincipal button[action=agregarcomunas]': {
                click: this.agregarcomunas
            },
            'comunasprincipal button[action=editarcomunas]': {
                click: this.editarcomunas
            },
            'comunasprincipal button[action=cerrarcomunas]': {
                click: this.cerrarcomunas
            },
            'comunasprincipal button[action=exportarexcelcomunas]': {
                click: this.exportarexcelcomunas
            },
            'usuariosprincipal button[action=cerrarusuarios]': {
                click: this.cerrarusuarios
            },
            'ciudadesprincipal button[action=cerrarciudades]': {
                click: this.cerrarciudades
            },
            'ciudadesprincipal button[action=exportarexcelciudades]': {
                click: this.exportarexcelciudades
            },
            'ubicacionesprincipal button[action=cerrarubicaciones]': {
                click: this.cerrarubicaciones
            },
            'medidasprincipal button[action=cerrarmedidas]': {
                click: this.cerrarmedidas
            },
            'vendedoresprincipal button[action=cerrarvendedores]': {
                click: this.cerrarvendedores
            },
            'vendedoresprincipal button[action=exportarexcelvendedores]': {
                click: this.exportarexcelvendedores
            },
            'vendedoresprincipal button[action=buscarvendedores]': {
                click: this.buscarvendedores
            },
            'vendedoresingresar button[action=grabarvendedores]': {
                click: this.validarut
            },
            'vendedoresprincipal button[action=agregarvendedores]': {
                click: this.agregarvendedores
            },
            'vendedoresprincipal button[action=editarvendedores]': {
                click: this.editarvendedores
            },
            'vendedoreseditar button[action=grabarvendedoreseditar]': {
                click: this.grabarvendedoreseditar
            },
            'familiasprincipal button[action=cerrarfamilias]': {
                click: this.cerrarfamilias
            },
            'familiasprincipal button[action=buscarfamilias]': {
                click: this.buscarfamilias
            },
            'familiasingresar button[action=grabarfamilias]': {
                click: this.grabarfamilias
            },
            'familiasprincipal button[action=agregarfamilias]': {
                click: this.agregarfamilias
            },
            'familiasprincipal button[action=editarfamilias]': {
                click: this.editarfamilias
            },
            'bodegasingresar button[action=grabarbodegas]': {
                click: this.grabarbodegas
            },
            'bodegasprincipal button[action=agregarbodegas]': {
                click: this.agregarbodegas
            },
            'bodegasprincipal button[action=editarbodegas]': {
                click: this.editarbodegas
            },
            'bodegasprincipal button[action=cerrarbodegas]': {
                click: this.cerrarbodegas
            },
            'marcasingresar button[action=grabarmarcas]': {
                click: this.grabarmarcas
            },
            'marcasprincipal button[action=agregarmarcas]': {
                click: this.agregarmarcas
            },
            'marcasprincipal button[action=editarmarcas]': {
                click: this.editarmarcas
            },
            'marcasprincipal button[action=cerrarmarcas]': {
                click: this.cerrarmarcas
            },
            'agrupacionesingresar button[action=grabaragrupaciones]': {
                click: this.grabaragrupaciones
            },
            'agrupacionesprincipal button[action=agregaragrupaciones]': {
                click: this.agregaragrupaciones
            },
            'agrupacionesprincipal button[action=editaragrupaciones]': {
                click: this.editaragrupaciones
            },
            'agrupacionesprincipal button[action=cerraragrupaciones]': {
                click: this.cerraragrupaciones
            },
            'subfamiliasingresar button[action=grabarsubfamilias]': {
                click: this.grabarsubfamilias
            },
            'subfamiliasprincipal button[action=agregarsubfamilias]': {
                click: this.agregarsubfamilias
            },
            'subfamiliasprincipal button[action=editarsubfamilias]': {
                click: this.editarsubfamilias
            },
            'subfamiliasprincipal button[action=cerrarsubfamilias]': {
                click: this.cerrarsubfamilias
            },
            'codactiveconprincipal button[action=agregarcodactivecon]': {
                click: this.agregarcodactivecon
            },
            'codactiveconprincipal button[action=editarcodactivecon]': {
                click: this.editarcodactivecon
            },
            'codactiveconingresar button[action=grabarcodactivecon]': {
                click: this.grabarcodactivecon
            }, 
            'codactiveconprincipal button[action=cerrarcodactivecon]': {
                click: this.cerrarcodactivecon
            },
            'codactiveconprincipal button[action=exportarexcelcodigoactividad]': {
                click: this.exportarexcelcodigoactividad
            },
            'codactiveconprincipal button[action=buscarcodactivecon]': {
                click: this.buscarcodactivecon
            },
            'bancosprincipal button[action=agregarbancos]': {
                click: this.agregarbancos
            },
            'bancosprincipal button[action=buscarbancos]': {
                click: this.buscarbancos
            },
            'tablaprincipal button[action=agregartablas]': {
                click: this.agregartablas
            },
            'tablaprincipal button[action=buscartablas]': {
                click: this.buscartablas
            },
            'bancosprincipal button[action=editarbancos]': {
                click: this.editarbancos
            },
            'tablaprincipal button[action=editartablas]': {
                click: this.editartablas
            },
            'bancosingresar button[action=grabarbancos]': {
                click: this.grabarbancos
            },
            'tablaingresar button[action=grabartablas]': {
                click: this.grabartablas
            }, 
            'bancosprincipal button[action=cerrarbancos]': {
                click: this.cerrarbancos
            },
            'tablaprincipal button[action=cerrartablas]': {
                click: this.cerrartablas
            },
            'bancosprincipal button[action=busquedabancos]': {
                click: this.busquedabancos
            },
            'bancosprincipal button[action=exportarexcelbancos]': {
                click: this.exportarexcelbancos
            },
            'condicionesdepagosprincipal button[action=agregarcondicionesdepagos]': {
                click: this.agregarcondicionesdepagos
            },
            'condicionesdepagosprincipal button[action=editarcondicionesdepagos]': {
                click: this.editarcondicionesdepagos
            },
            'condicionesdepagosingresar button[action=grabarcondicionesdepagos]': {
                click: this.grabarcondicionesdepagos
            }, 
            'condicionesdepagosprincipal button[action=cerrarcondicionesdepagos]': {
                click: this.cerrarcondicionesdepagos
            },
            'condicionesdepagosprincipal button[action=busquedacondicionesdepagos]': {
                click: this.busquedacondicionesdepagos
            },

            'condicionesdepagosprincipal button[action=exportarexcelcondiciondepago]': {
                click: this.exportarexcelcondiciondepago
            },
            'sucursalesprincipal button[action=agregarsucursales]': {
                click: this.agregarsucursales
            },
            'sucursalesprincipal button[action=editarsucursales]': {
                click: this.editarsucursales
            },
            'sucursalesingresar button[action=grabarsucursales]': {
                click: this.grabarsucursales
            }, 
            'sucursalesprincipal button[action=cerrarsucursales]': {
                click: this.cerrarsucursales
            },
            'sucursalesprincipal button[action=buscarsucursales]': {
                click: this.buscarsucursales
            },
            'sucursalesprincipal button[action=exportarexcelsucursales]': {
                click: this.exportarexcelsucursales
            },
            'plazasprincipal button[action=agregarplazas]': {
                click: this.agregarplazas
            },
            'plazasprincipal button[action=editarplazas]': {
                click: this.editarplazas
            },
            'plazasprincipal button[action=exportarexcelplazas]': {
                click: this.exportarexcelplazas
            },
            'plazasingresar button[action=grabarplazas]': {
                click: this.grabarplazas
            }, 
            'plazasprincipal button[action=cerrarplazas]': {
                click: this.cerrarplazas
            },
            'plazasprincipal button[action=buscarplazas]': {
                click: this.buscarplazas
            },
            'cajerosprincipal button[action=cerrarcajeros]': {
                click: this.cerrarcajeros
            },
            'cajerosprincipal button[action=buscarcajeros]': {
                click: this.buscarcajeros
            },
            'cajerosingresar button[action=grabarcajeros]': {
                click: this.grabarcajeros
            },
            'cajerosprincipal button[action=agregarcajeros]': {
                click: this.agregarcajeros
            },
            'cajerosprincipal button[action=exportarexcelcajeros]': {
                click: this.exportarexcelcajeros
            },
            'cajasprincipal button[action=editarcajas]': {
                click: this.editarcajas
            },
            'cajerosprincipal button[action=editarcajeros]': {
                click: this.editarcajeros
            },
            'cajasprincipal button[action=cerrarcajas]': {
                click: this.cerrarcajas
            },
            'cajasprincipal button[action=buscarcajas]': {
                click: this.buscarcajas
            },
            'cajasingresar button[action=grabarcajas]': {
                click: this.grabarcajas
            },
            'cajasprincipal button[action=agregarcajas]': {
                click: this.agregarcajas
            },
            'cajasprincipal button[action=editarcajas]': {
                click: this.editarcajas
            },
            'vendedoresprincipal button[action=cambioclave]': {
                click: this.cambioclave
            },
            
            'cambiopassword button[action=grabaclave]': {
                click: this.grabaclave
            }          


        });
    },

    grabaclave : function(){


        var view = this.getCambiopassword();
        var id = view.down('#Idid').getValue();
        var oldpass = view.down('#oldpass').getValue();
        var newpass = view.down('#newpass').getValue();
        var newpass2 = view.down('#newpass2').getValue();

        if(!oldpass){
            Ext.Msg.alert('Debe Completar Datos del Formulario');
            return;   
        };

         if(!newpass){
            Ext.Msg.alert('Debe Completar Datos del Formulario');
            return;   
        };

        if(!newpass2){
            Ext.Msg.alert('Debe Completar Datos del Formulario');
            return;   
        };

        if ( newpass != newpass2  ){

            Ext.Msg.alert('Nueva no es Igual');
            return; 
            

        };



        Ext.Ajax.request({
            url: preurl + 'vendedores/changePass',
            waitMsg: 'Grabando...',
            params: {
                id: id,
                oldpass: oldpass,
                newpass: newpass,
                newpass2: newpass2
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 if(resp.success == true){
                        Ext.MessageBox.show({
                           title:'Informacion',
                           msg: 'Grabado exitosamente',
                           buttons: Ext.MessageBox.OK,
                           icon: Ext.MessageBox.INFO
                        }); 
                        view.close();
                }else{
                        Ext.MessageBox.show({
                           title:'Error',
                           msg: 'Verifica la informacion entregada',
                           buttons: Ext.MessageBox.OK,
                           icon: Ext.MessageBox.WARNING
                        }); 
                }
                               
            }
           
        });


    },

    cambioclave : function(){

        var view = this.getVendedoresprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.vendedores.CambioPassword').show();
            edit.down('#Idid').setValue(row.data.id);
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }      


    },

    grabarvendedoreseditar: function(){

        var view = this.getVendedoreseditar();
        var nombre = view.down('#nombreId').getValue();
        var rut = view.down('#nombreId').getValue();
        var direccion = view.down('#direccionId').getValue();
        var fono = view.down('#fonoId').getValue();
        var comision = view.down('#comisionId').getValue();
        var estado = view.down('#tipoEstadoId').getValue();
        var password = view.down('#passwordId').getValue();
        var id = view.down('#idId').getValue();       
        var st = this.getVendedoresStore();

        Ext.Ajax.request({
            url: preurl + 'vendedores/update',
            params: {
                id: id,
                nombre: nombre,
                rut: rut,
                direccion: direccion,
                fono: fono,
                comision: comision,
                estado: estado,
                password: password
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) { 

                    Ext.Msg.alert('Registro', 'Corregido Exitosamente.');
                    return;

                };
               
            }
           
        });
        
        view.close();
        st.load();
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.login()
        }
    },

    special2: function(f,e){
        if (e.getKey() == e.ENTER) {
            var view = this.getLogin();
            view.down("#enterId").focus();
        }
    },

    exportarexcelcajeros: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getCajerosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelCajeros?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelplazas: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPlazasprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPlazas?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelbancos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getBancosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelBancos?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelsucursales: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getSucursalesprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelSucursales?cols='+Ext.JSON.encode(jsonCol));
 
    },
    exportarexcelcondiciondepago: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getCondicionesdepagosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelCondiciondepago?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelcodigoactividad: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getCodactiveconprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelCodactivecon?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelvendedores: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getVendedoresprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelVendedores?cols='+Ext.JSON.encode(jsonCol));
 
    },

     exportarexcelciudades: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getCiudadesprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelCiudades?cols='+Ext.JSON.encode(jsonCol));
 
    },

    exportarexcelcomunas: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getComunasprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelComunas?cols='+Ext.JSON.encode(jsonCol));
 
    },
   
    mclientes: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'clientesprincipal'});
    },

    mplazas: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'plazasprincipal'});
    },

    msucursales: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'sucursalesprincipal'});
    },
    

    mcondicionpagos: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'condicionesdepagosprincipal'});
    },

    mbancos: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'bancosprincipal'});
    },

    mcodactivecon: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'codactiveconprincipal'});
    },

    mbodegas: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'bodegasprincipal'});
    },

     mmarcas: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'marcasprincipal'});
    },

    magrupaciones: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'agrupacionesprincipal'});
    },

    msubfamilias: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'subfamiliasprincipal'});
    },

    mfamilias: function(){
      
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'familiasprincipal'});
    },

    mproductos: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'productosprincipal'});
        var view = this.getProductosprincipal();
        view.down("#nombreId").focus();
    },

    mvendedores: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'vendedoresprincipal'});
        
    },

    mcajeros: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cajerosprincipal'});
        
    },

    mtablas: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'tablaprincipal'});
        
    },

    mcajas: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cajasprincipal'});
        
    },

    mubica: function(){
   
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ubicacionesprincipal'});
    },

    mmedidas: function(){
   
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'medidasprincipal'});
    },


    mproveedores: function(){
        console.log("aqui estamos")
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'proveedorprincipal'});
    },

    mciudades: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ciudadesprincipal'});
    },

    musuarios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'adminusuarios'});
    },
    mroles: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'adminroles'});
    },
    mcomunas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'comunasprincipal'});
    },

    mejemplos: function(){
        Ext.create('Infosys_web.view.ventas.Ejemplo').show();
    },

    cc_md_oingresos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'otrosingresosprincipal'});
    },

    cc_md_resmovimiento: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'resumenmovimientoprincipal'});
    },

    cc_md_librodiario: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'librodiarioprincipal'});
    },

    cc_rep_saldosdocumentos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'saldodocumentosprincipal'});
    },


    cc_tg_creacioncuentas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'creacioncuentasprincipal'});
    },


    cc_md_mcancelaciones: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cancelacionesprincipal'});
    },

    cc_rep_cartola: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        view = viewport.add({xtype: 'cartolaprincipal'});
    },

    modules_security: function(modules, mtop) {
        var me = this;

        if(modules){
            me.changemenuTopMenu(modules, mtop)
        }
    },
    
    changemenuTopMenu:  function(modules, mtop){

        if(modules){
            for(var i=0;i<modules.length;i++){
                    mtop.down('#'+modules[i].codigo).setDisabled(false)
            }  
        }

    },
   

     login: function(){
        var view = this.getLogin()
        var form = view.down('form')
        var me = this

        form.submit({
            url: preurl+'login/ingreso',
            //url: '/Deik/core/index.php/login/ingreso',
            success: function(s, o) {
                var objs = Ext.JSON.decode(o.response.responseText);

                if(objs.success == true){
                    var vport = Ext.create('Infosys_web.view.Viewport');
                    var mtop = vport.down("topmenus")
                    var modules = objs.modules
                    data_sess.modules = modules
                    me.modules_security(modules, mtop)

                    view.close();
                }else{
                    Ext.Msg.alert('Alerta', 'Usuario/Contraseña Invalidos.');
                    return;
                }

                
                //Ext.getCmp('widlogin').close()
                Ext.getCmp('widloginprin').remove()
                                         
            },

            failure: function(form, action) {
           
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'No existe usuario/contraseña',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        });
    },


    grabarciudades: function(){
        var win    = this.getCiudadesingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getCiudadStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Ciudad');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarplazas: function(){
        var win    = this.getPlazasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getPlazaStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Plaza');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarsucursales: function(){
        var win    = this.getSucursalesingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getSucursalStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Sucursal');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },


    grabarcondicionesdepagos: function(){

        var win    = this.getCondicionesdepagosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getCond_pagoStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Cond_pag');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarbancos: function(){
        var win    = this.getBancosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getBancoStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Banco');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabartablas: function(){
        var win    = this.getTablaingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getTabladescuentoStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Tabladescuento');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarcodactivecon: function(){
        var win    = this.getCodactiveconingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getCod_activ_ecoStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Cod_activ_eco');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabaragrupaciones: function(){
        var win    = this.getAgrupacionesingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getAgrupacionStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Agrupaciones');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarsubfamilias: function(){
        var win    = this.getSubfamiliasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getSubfamiliaStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Subfamilias');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarbodegas: function(){
        var win    = this.getBodegasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getBodegasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Bodegas');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarmarcas : function(){
        var win    = this.getMarcasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getMarcasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.marcas');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },


    grabarfamilias: function(){
        var win    = this.getFamiliasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getFamiliasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Familia');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },


    grabarubicaciones: function(){
        var win    = this.getUbicacionesingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getUbicacionesStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Ubica');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarmedidas: function(){
        var win    = this.getMedidasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getMedidasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Medida');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarusuarios: function(){
        var win    = this.getUsuariosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getUsuarioStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Usuario');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarcomunas: function(){
        var win    = this.getComunasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getComunaStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Comuna');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    validarut: function(){

        var win = this.getVendedoresingresar();
        var rut = win.down('#rutId').getValue();
        var nombre = win.down('#nombreId').getValue();
        var direccion = win.down('#direccionId').getValue();
        var fono = win.down('#fonoId').getValue();
        var comision = win.down('#comisionId').getValue();
        var estado = win.down('#tipoEstadoId').getValue();       
        var ok = "si";
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };
        if (!nombre){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Nombre');
                 return;
        };
        if (!direccion){
             Ext.Msg.alert('Alerta', 'Debe Ingresar direccion');
                 return;
        };
        if (!fono){
             Ext.Msg.alert('Alerta', 'Debe Ingresar fono');
                 return;
        };
        if (!comision){
             Ext.Msg.alert('Alerta', 'Debe Ingresar comision');
                 return;
        };
        if (!estado){
             Ext.Msg.alert('Alerta', 'Debe Ingresar estado');
                 return;
        };

        Ext.Ajax.request({
            url: preurl + 'vendedores/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {

                    if (resp.existe == true){

                    Ext.Msg.alert('Informacion', 'Rut Ya Existe');
                    return false;
                    var ok = "no";

                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      return false;
                      var ok = "no";
                }
               
            }

        });
        win.down('#validaId').setValue(ok);
        this.grabarvendedores();

    },

    grabarvendedores: function(){

        var view = this.getVendedoresingresar(); 
        var valida = view.down('#validaId').getValue();
        
        if (valida == "si"){ 
        var win = this.getVendedoresingresar();
            var form   = win.down('form');
            var record = form.getRecord();
            var values = form.getValues();    


            var st = this.getVendedoresStore();
            
            var nuevo = false;
            
            if (values.id > 0){
                record.set(values);
            } else{
                record = Ext.create('Infosys_web.model.Vendedor');
                record.set(values);
                st.add(record);
                nuevo = true;
            }
            
            win.close();
            st.sync();

            if (nuevo){ 
                st.load();
            }

        }else{

            win.close();
            st.sync();
            
        }

         

    },
       
    grabarcajeros: function(){

        var win    = this.getCajerosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getCajerosStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Cajero');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    grabarcajas: function(){

        var win    = this.getCajasingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        var st = this.getCajasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Caja');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync();

        if (nuevo){ 
            st.load();
        }
    },

    filtroContactos: function(){

        var view = this.getAccionesprincipal();
        var st = this.getContactosStore();
        var valor = view.down('#tipoContactoId').getValue();
    
        //debugger;
        if(valor!=0){
            st.getProxy().extraParams = {
                fTipo: valor,
                start: 0,
                limit: 35
            };
        }else{
            st.getProxy().extraParams = {}
        }
        st.load();
    },

       
    buscarciudades: function(){
        var view = this.getCiudadesprincipal()
        var st = this.getCiudadStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarplazas: function(){
        var view = this.getPlazasprincipal()
        var st = this.getPlazaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarsucursales: function(){
        var view = this.getSucursalesprincipal()
        var st = this.getSucursalStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    busquedacondicionesdepagos: function(){
        var view = this.getCondicionesdepagosprincipal()
        var st = this.getCond_pagoStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarbancos: function(){
        var view = this.getBancosprincipal()
        var st = this.getBancoStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscartablas: function(){
        var view = this.getTablaprincipal()
        var st = this.getTabladescuentoStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarcodactivecon: function(){

        console.log("codigos Ok")
        var view = this.getCodactiveconprincipal()
        var st = this.getCod_activ_ecoStore()
        var nombre = view.down('#nombreId').getValue()
        console.log(nombre)
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscaragrupaciones: function(){
        var view = this.getAgrupacionesprincipal()
        var st = this.getAgrupacionStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarsubfamilias: function(){
        var view = this.getSubfamiliasprincipal()
        var st = this.getSubfamiliaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarbodegas: function(){
        var view = this.getBodegasprincipal()
        var st = this.getBodegasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarmarcas: function(){
        var view = this.getMarcasprincipal()
        var st = this.getMarcasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarfamilias: function(){
        var view = this.getFamiliasprincipal()
        var st = this.getCiudadStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarubicacion: function(){
        var view = this.getUbicacionprincipal()
        var st = this.getUbicacionStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarmedidas: function(){
        var view = this.getMedidasprincipal()
        var st = this.getMedidasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarusuarios: function(){
        var view = this.getUsuariosprincipal()
        var st = this.getUsuarioStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarcomunas: function(){
        var view = this.getComunasprincipal()
        var st = this.getComunaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarvendedores: function(){
        var view = this.getVendedoresprincipal()
        var st = this.getVendedorStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarcajeros: function(){
        var view = this.getCajerosprincipal()
        var st = this.getCajerosStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    buscarcajas: function(){
        var view = this.getCajasprincipal()
        var st = this.getCajasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    editarciudades: function(){
        var view = this.getCiudadesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.ciudades.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarplazas: function(){

        var view = this.getPlazasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.plazas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarsucursales: function(){

        var view = this.getSucursalesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.sucursales.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarcondicionesdepagos: function(){
        var view = this.getCondicionesdepagosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.cond_pagos.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarbancos: function(){
        var view = this.getBancosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.bancos.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editartablas: function(){
        var view = this.getTablaprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.Tabladescuento.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarcodactivecon: function(){
        var view = this.getCodactiveconprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.cod_activ_econ.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editaragrupaciones: function(){
        var view = this.getAgrupacionesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.agrupaciones.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarsubfamilias: function(){
        var view = this.getSubfamiliasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.subfamilias.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarbodegas: function(){
        var view = this.getBodegasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.bodegas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarmarcas: function(){
        var view = this.getMarcasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.marcas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarfamilias: function(){
        var view = this.getFamiliasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.familias.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarubicaciones: function(){
        var view = this.getUbicacionesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.ubicaciones.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarmedidas: function(){
        var view = this.getMedidasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.medidas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarusuarios: function(){
        var view = this.getUsuariosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.usuarios.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarcomunas: function(){
        var view = this.getComunasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.comunas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarvendedores: function(){
        var view = this.getVendedoresprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.vendedores.Editar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarcajeros: function(){
        var view = this.getCajerosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.cajeros.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    editarcajas: function(){
        var view = this.getCajasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.cajas.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    agregarciudades: function(){
        Ext.create('Infosys_web.view.ciudades.Ingresar').show();
    },

    agregarplazas: function(){
        Ext.create('Infosys_web.view.plazas.Ingresar').show();
    },

    agregarsucursales: function(){
        Ext.create('Infosys_web.view.sucursales.Ingresar').show();
    },

    agregarcondicionesdepagos: function(){
        Ext.create('Infosys_web.view.cond_pagos.Ingresar').show();
    },

    agregarbancos: function(){
        Ext.create('Infosys_web.view.bancos.Ingresar').show();
    },

    agregartablas: function(){
        Ext.create('Infosys_web.view.Tabladescuento.Ingresar').show();
    },    

    agregarcodactivecon: function(){
        Ext.create('Infosys_web.view.cod_activ_econ.Ingresar').show();
    },

    agregaragrupaciones: function(){
        Ext.create('Infosys_web.view.agrupaciones.Ingresar').show();
    },

    agregarsubfamilias: function(){
        Ext.create('Infosys_web.view.subfamilias.Ingresar').show();
    },

    agregarbodegas: function(){
        Ext.create('Infosys_web.view.bodegas.Ingresar').show();
    },

    agregarmarcas: function(){
        Ext.create('Infosys_web.view.marcas.Ingresar').show();
    },

    agregarfamilias: function(){
        Ext.create('Infosys_web.view.familias.Ingresar').show();
    },


    agregarmedidas: function(){
        Ext.create('Infosys_web.view.medidas.Ingresar').show();
    },

    agregarusuarios: function(){
        Ext.create('Infosys_web.view.usuarios.Ingresar').show();
    },

    agregarcomunas: function(){
        Ext.create('Infosys_web.view.comunas.Ingresar').show();

    },

    agregarvendedores: function(){
        Ext.create('Infosys_web.view.vendedores.Ingresar').show();

    },

    agregarcajeros: function(){
        Ext.create('Infosys_web.view.cajeros.Ingresar').show();

    },

    agregarcajas: function(){
        Ext.create('Infosys_web.view.cajas.Ingresar').show();

    },

    agregarubicaciones: function(){
        Ext.create('Infosys_web.view.ubicaciones.Ingresar').show();
    },    

    cerrarusuarios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarplazas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarsucursales: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarcondicionesdepagos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarbancos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrartablas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerraragrupaciones: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
    
    cerrarcodactivecon: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },  

    cerrarsubfamilias: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarbodegas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 

    cerrarmarcas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    }, 
    
    cerrarmedidas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    cerrarfamilias: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    cerrarvendedores: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    cerrarcajeros: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    cerrarcajas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
    
    cerrarsistema: function(){
           //console.log("aqui");
           var viewport = this.getPanelprincipal();
           viewport.removeAll();
           url: preurl_js;
    },

    cerrarciudades: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    cerrarcomunas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
    cerrarubicaciones: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

});










