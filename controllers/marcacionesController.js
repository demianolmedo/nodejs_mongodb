const pool = require("../config/marcaciones");
const {MarcacionesModel} = require("../models/Marcaciones")

exports.obtenerMarcaciones = async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
	//const rows1 = await conn.query("SELECT fecha_ingreso FROM tbl_marcacion where id_user='"+req.params.id+"' GROUP BY fecha_ingreso ORDER BY fecha_ingreso desc LIMIT 10");
	const rows = await conn.query("SELECT * FROM bd_marcaciones.tbl_marcacion where id_user='"+req.params.id+"' ORDER BY id_marcacion desc limit 10");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.buscarMarcaciones = async (req, res) => {    
  const {tipo, fecha_inicio, fecha_fin, usuario, plataforma} = req.body;
  let conn;
  let consulta
  try {
	conn = await pool.getConnection();
  if(tipo=='usuario'){
    consulta="SELECT USERS.DESCRIPTION AS nombre_usuario,L6_PLATAFORMA.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN APPLPORDB.USERS ON USER_ID=id_user LEFT JOIN APPLPORDB.L6_PLATAFORMA ON L6_PLATAFORMA.id_auto=tbl_marcacion.plataforma WHERE id_user='"+usuario+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
  }
  else{
    consulta="SELECT USERS.DESCRIPTION AS nombre_usuario,L6_PLATAFORMA.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN APPLPORDB.USERS ON USER_ID=id_user LEFT JOIN APPLPORDB.L6_PLATAFORMA ON L6_PLATAFORMA.id_auto=tbl_marcacion.plataforma WHERE tbl_marcacion.plataforma='"+plataforma+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
  }
  console.log(consulta);
	const rows = await conn.query(consulta);
	res.send(rows);
  console.log(req.body)
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.guardaMarcaciones = async (req, res) => {   
  
  const { id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso } = req.body;
   let conn;
  try {
	conn = await pool.getConnection();
  //console.log("INSERT INTO bd_marcaciones.tbl_marcacion (id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso) VALUES ("+id_user+", '"+fecha_ingreso+"', '"+hora_ingreso+"', '"+loc_ingreso+"', "+estado+", '"+ip_on+"', '"+dispositivo_on+"', '"+so_on+"', '"+trabajo+"', "+plataforma+", '"+tiempo_ingreso+"')")
	//const rows = await conn.query("SELECT USER_ID, DESCRIPTION, END_DATE FROM APPLPORDB.USERS INNER JOIN bd_marcaciones.tbl_marcacion ON USER_ID=tbl_marcacion.id_user WHERE END_DATE='0000-00-00 00:00:00' GROUP BY USER_ID ORDER BY DESCRIPTION");
	const rows = await conn.query("INSERT INTO bd_marcaciones.tbl_marcacion (id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso) VALUES ("+id_user+", '"+fecha_ingreso+"', '"+hora_ingreso+"', '"+loc_ingreso+"', "+estado+", '"+ip_on+"', '"+dispositivo_on+"', '"+so_on+"', '"+trabajo+"', "+plataforma+", '"+tiempo_ingreso+"')");
  res.send(rows);
  
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
 }

exports.salidaMarcaciones = async (req, res) => {    
  const { id_marcacion, fecha_salida, hora_salida, loc_salida, ip_off, dispositivo_off, so_off, tiempo_salida } = req.body;
  let conn;
  try {
  conn = await pool.getConnection();
  const rows = await conn.query("UPDATE bd_marcaciones.tbl_marcacion SET fecha_salida='"+fecha_salida+"', hora_salida='"+hora_salida+"', loc_salida='"+loc_salida+"', ip_off='"+ip_off+"', dispositivo_off='"+dispositivo_off+"', so_off='"+so_off+"', tiempo_salida='"+tiempo_salida+"' WHERE id_marcacion="+id_marcacion+"");
  //res.send(marcaciones);
  console.log(req.body)
  } catch (err) {
  throw err;
  } finally {
  if (conn) return conn.end();
  }
}

exports.obtenerUsuarios = async (req, res) => {   
  //console.log("sssq");
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT USER_ID, DESCRIPTION, END_DATE FROM APPLPORDB.USERS INNER JOIN bd_marcaciones.tbl_marcacion ON USER_ID=tbl_marcacion.id_user WHERE END_DATE='0000-00-00 00:00:00' GROUP BY USER_ID ORDER BY DESCRIPTION");
	res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.obtenerPlataformas = async (req, res) => {    
  //console.log("sss");   
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT id_auto, plataforma  FROM APPLPORDB.L6_PLATAFORMA WHERE estado='1' ORDER BY plataforma");
	res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}





