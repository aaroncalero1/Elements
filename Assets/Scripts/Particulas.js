#pragma strict

public class Coleccion{
	
	public var reacciones = new Array();

	public function Coleccion(){
		reacciones.push(new Reaccion("H","H","H2",1));
		reacciones.push(new Reaccion("O","O","O2",1));
		reacciones.push(new Reaccion("H2","H2","2H2",1));
		reacciones.push(new Reaccion("2H2","O2","H2O",2));
		reacciones.push(new Reaccion("O2","2H2","H2O",2));
	}		
}

public class Reaccion {

	var r1: String;
	var r2: String;
	var res: String;
	var nr: int;

	public function Reaccion(reac1: String,reac2 : String,resul : String, numRes : int){
		r1=reac1;
		r2=reac2;
		res=resul;
		nr=numRes;
	}
}